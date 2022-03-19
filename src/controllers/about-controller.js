export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About POI",
        };
        return h.view("about-view", viewData);
      },
    },
  };