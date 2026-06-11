import { spawnSync } from "node:child_process"
import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, "..")
const siteRoot = path.join(repoRoot, "apps", "site")
const srcRoot = path.join(siteRoot, "src")
const variantsRoot = path.join(siteRoot, "variants")
const activeFile = path.join(siteRoot, ".active-theme")

const validThemes = new Set(["legacy", "cinematic"])
const requestedTheme = process.argv[2]
const forceSwitch = process.argv.includes("--force")

if (!validThemes.has(requestedTheme)) {
  console.error("Usage: node scripts/switch-site-theme.mjs <legacy|cinematic> [--force]")
  process.exit(1)
}

const requiredDirs = ["pages", "components", "layouts", "styles"]
const requiredFiles = [path.join("styles", "global.css")]
const exists = async (targetPath) => {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

const assertSnapshot = async (themeName) => {
  const snapshotRoot = path.join(variantsRoot, themeName)
  if (!(await exists(snapshotRoot))) {
    throw new Error(`Missing snapshot folder: ${snapshotRoot}`)
  }
  for (const dir of requiredDirs) {
    const dirPath = path.join(snapshotRoot, dir)
    if (!(await exists(dirPath))) {
      throw new Error(`Missing snapshot directory: ${dirPath}`)
    }
  }
  for (const file of requiredFiles) {
    const filePath = path.join(snapshotRoot, file)
    if (!(await exists(filePath))) {
      throw new Error(`Missing snapshot file: ${filePath}`)
    }
  }
}

const readActiveTheme = async () => {
  try {
    const value = await fs.readFile(activeFile, "utf8")
    return value.trim()
  } catch {
    return "unknown"
  }
}

const copyDir = async (sourceDir, targetDir) => {
  await fs.rm(targetDir, { recursive: true, force: true })
  await fs.mkdir(path.dirname(targetDir), { recursive: true })
  await fs.cp(sourceDir, targetDir, { recursive: true })
}

const getDirtyThemePaths = () => {
  const result = spawnSync(
    "git",
    [
      "status",
      "--short",
      "--untracked-files=normal",
      "--",
      path.relative(repoRoot, srcRoot),
      path.relative(repoRoot, variantsRoot),
      path.relative(repoRoot, activeFile),
    ],
    {
      cwd: repoRoot,
      encoding: "utf8",
    },
  )

  if (result.error) {
    throw new Error(`Unable to inspect git status before switching themes: ${result.error.message}`)
  }

  if (result.status !== 0) {
    throw new Error(`Theme switch aborted because git status failed:\n${result.stderr || result.stdout}`)
  }

  return result.stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

const assertThemeWorkspaceClean = () => {
  if (forceSwitch) {
    return
  }

  const dirtyPaths = getDirtyThemePaths()
  if (dirtyPaths.length === 0) {
    return
  }

  throw new Error(
    [
      "Theme switch aborted: apps/site theme files have uncommitted changes.",
      "Commit or stash changes in apps/site/src and apps/site/variants before switching.",
      "Use --force only if you intentionally want to overwrite snapshots.",
      "",
      ...dirtyPaths,
    ].join("\n"),
  )
}

const backupCurrentTheme = async (themeName) => {
  if (!validThemes.has(themeName)) {
    console.warn(`Active theme '${themeName}' is unknown; skipping backup.`)
    return
  }
  const snapshotRoot = path.join(variantsRoot, themeName)
  await fs.mkdir(snapshotRoot, { recursive: true })
  for (const dir of requiredDirs) {
    await copyDir(path.join(srcRoot, dir), path.join(snapshotRoot, dir))
  }
  console.log(`Snapshot refreshed: ${themeName}`)
}

const applyTheme = async (themeName) => {
  const snapshotRoot = path.join(variantsRoot, themeName)
  for (const dir of requiredDirs) {
    await copyDir(path.join(snapshotRoot, dir), path.join(srcRoot, dir))
  }
  await fs.writeFile(activeFile, `${themeName}\n`)
  console.log(`Active theme set to: ${themeName}`)
}

const run = async () => {
  const currentTheme = await readActiveTheme()
  if (currentTheme === requestedTheme) {
    console.log(`Active theme is already '${requestedTheme}'. No files changed.`)
    return
  }

  assertThemeWorkspaceClean()
  await assertSnapshot(requestedTheme)
  await backupCurrentTheme(currentTheme)
  await applyTheme(requestedTheme)
}

run().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
