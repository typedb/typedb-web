import { linkProps } from "../shared";

export const cloudUiBannerQuery = `
{
  "cloudUiBanner": *[(_type match 'cloudUiBanner')][0]{
    isEnabled,
    isEnabled == true => {
      link->${linkProps},
      "spans": text[0].children[_type=='span']{
        text, marks
      }
    }
  }
}
`;
