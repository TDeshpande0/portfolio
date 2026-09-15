export const ROUTES = {
  home: "/",
  tangoCaseStudy: "/work/tango-portal",
  deltaCaseStudy: "/work/delta-airlines-redesign",
};

export const isCaseStudy = (pathname) => pathname.startsWith("/work/");
