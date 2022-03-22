export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    routes: {
      _model: "Route",
      frances: {
        title: "Camino Frances",
        userid: "->users.bart"
      },
      portugues: {
        title: "Camino Portugues",
        userid: "->users.homer"
      }
    },
    stops: {
      _model: "Stop",
      stop_1 : {
        title: "Sarria",
        locationlat: 42.7600,
        locationlong: 7.4165,
        description: "Tough walk",
        routeid: "->routes.portugues"
      },
      stop_2 : {
        title: "Zubiri",
        locationlat: 42.9304,
        locationlong: 1.5046,
        description: "Nice bridge",
        routeid: "->routes.frances"
      }
    }
  };