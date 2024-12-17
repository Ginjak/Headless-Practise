export function replaceBaseURL(url) {
  const oldBaseURL = process.env.NEXT_DOMAIN_NAME;
  const newBaseURL = process.env.NEXT_MAIN_DOMAIN_NAME;
  return url.replace(oldBaseURL, newBaseURL);
}
