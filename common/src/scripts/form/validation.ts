export const idPattern = /^[a-z0-9]([a-z0-9_-]{0,30}[a-z0-9])?$/m;
export const idPatternErrorText = "Must be made up of lowercase letters and numbers, optionally separated by hyphens and underscores";
export const namePattern = /^(\w([\s\w-]{0,30}\w)?)$/m;
export const namePatternErrorText = "Letters, spaces and hyphens only. Must start and end with a letter";
export const emailPattern =
    /^(([A-Za-z0-9_\-+]+(\.[A-Za-z0-9_\-+]+)*)|(\.\+))@([A-Za-z\-0-9]+\.)+[a-zA-Z]{2,}$/;

export const emailPatternErrorText = "Must be a valid email address";
export const emailListPatternErrorText = "Must be a comma-separated list of email addresses (e.g. user1@site.com, user2@site.com)";
export const emailListPattern = /^(|((([A-Za-z0-9_\-+]+(\.[A-Za-z0-9_\-+]+)*)|(\.\+))@([A-Za-z\-0-9]+\.)+[a-zA-Z]{2,},\s?)*(([A-Za-z0-9_\-+]+(\.[A-Za-z0-9_\-+]+)*)|(\.\+))@([A-Za-z\-0-9]+\.)+[a-zA-Z]{2,}\s*)$/;
