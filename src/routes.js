export const ROUTES = {
  home: "/",
  about: "/about",
  tangoCaseStudy: "/work/tango-portal",
  campaignsCaseStudy: "/work/tango-reward-campaigns",
  deltaCaseStudy: "/work/delta-airlines-redesign",
};

export const isCaseStudy = (pathname) => pathname.startsWith("/work/");
