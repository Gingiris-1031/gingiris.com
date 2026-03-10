export function mapAuthErrorMessage(message: string | null | undefined, locale: "zh" | "en") {
  if (!message) {
    return locale === "zh" ? "登录失败，请稍后重试。" : "Sign-in failed. Please try again.";
  }

  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials") || normalized.includes("invalid token")) {
    return locale === "zh" ? "验证码或登录链接无效，请重新获取。" : "The code or sign-in link is invalid. Request a new one.";
  }

  if (normalized.includes("expired")) {
    return locale === "zh" ? "登录链接或验证码已过期，请重新获取。" : "The sign-in link or code has expired. Request a new one.";
  }

  if (normalized.includes("rate limit") || normalized.includes("security purposes")) {
    return locale === "zh" ? "请求过于频繁，请稍后再试。" : "Too many attempts. Please wait and try again.";
  }

  if (normalized.includes("email not confirmed")) {
    return locale === "zh" ? "邮箱尚未确认，请检查收件箱。" : "Email is not confirmed yet. Please check your inbox.";
  }

  if (normalized.includes("network")) {
    return locale === "zh" ? "网络异常，请检查连接后重试。" : "Network error. Check your connection and try again.";
  }

  return locale === "zh" ? "登录暂时不可用，请稍后重试。" : "Sign-in is temporarily unavailable. Please try again.";
}
