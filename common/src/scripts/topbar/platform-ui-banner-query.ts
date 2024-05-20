import { linkProps } from "../shared";

export const platformUiBannerQuery = `
{
  "platformUiBanner": *[(_type match 'platformUiBanner')][0]{
    isEnabled,
    isEnabled == true => {
      link->${linkProps},
      "spans": text[0].children[_type=='span']{
        text, marks
      }
    }
  },
}
`;
