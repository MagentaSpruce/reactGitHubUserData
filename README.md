# reactGitHubUserData
This React app pulls GitHub user profiles and displays various data including the use of charts for data display.
Visit app here: https://react-github-user-search-sprucey.netlify.app/login

This app uses fusion charts and alt0.

A general overview of the pertinent React code is given below:

Once the initial file tree is prepared then the React Router is setup.
```React
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard></Dashboard>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Error></Error>
        </Route>
      </Switch>
    </Router>
  );
}
```

Next the error page was setup.
```React
import styled from "styled-components";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h3>Sorry, the page you tried does not exist!</h3>
        <Link to="/" className="btn">
          Go back rapscallion!
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;
```

Next the login page was setup.
```React
const Login = () => {
  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="github user" />
        <h1>github user</h1>
        <button className="btn">login</button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
```

Next the components inside the dashboard page are setup.
```React
const Dashboard = () => {
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};
```

Next the global state is setup using Context API inside of context.js.
```React
const GithubContext = React.createContext(); //gives access to Provider & Consumer

const GithubProvider = ({ children }) => {
  return (
    <GithubContext.Provider value="hey beebee">
      {children}
    </GithubContext.Provider>
  );
};

export{GithubProvider, GithubContext};
```

Next the application is wrapped in the GithubProvider.
```React
ReactDOM.render(
  <React.StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Next GithubContext is imported(not shown) and used inside of info.js to test that the .Provider value is accessible throughout the app.
```React
const UserInfo = () => {
  const data = React.useContext(GithubContext);
  return <h2>user info component: {data}</h2>;
};
```

Mock data is used to set up the dashboard of the application to prevent the API requests from running out. Later the mock data will be switched out for the data coming from the GitHub API. Next the mock data is imported into context.js(not shown) and since .Provider is being used state values can be set up to passback the mock data.
```React
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
```

An Error: Objects are not valid as a React child error occurs upon save because the strings were converted into objects inside of value. To fix this {data} is removed from UserInfo and console.logged instead(not shown). The data should return an object containing the followes, githubUser and repos data objects. Now data can start to be pulled out for each seperate component inside of the dashboard.

To start that process the static components are first worked on the info component which displays repos, followers, following, and gists.
```React
const UserInfo = () => {
  // console.log(data);
  const { githubUser } = React.useContext(GithubContext);
  const { public_repos, followers, following, public_gists } = githubUser;
```

Next the first item is setup.
```React
  const items = [
    {
      id: 1,
      icon: <GoRepo className="icon" />,
      label: "repos",
      value: public_repos,
      color: "pink",
    },
  ];
```

Next the remaining three were done.
```React
    {
      id: 2,
      icon: <FiUsers className="icon" />,
      label: "followers",
      value: followers,
      color: "green",
    },
    {
      id: 3,
      icon: <FiUserPlus className="icon" />,
      label: "following",
      value: following,
      color: "purple",
    },
    {
      id: 4,
      icon: <GoGist className="icon" />,
      label: "gist",
      value: public_gists,
      color: "yellow",
    },
```

Next where the items are to be displayed, they are iterated over and displayed on the screen.
```React
  return (
    <section className="section">
      <Wrapper className="section-center">
        {items.map((item) => {
          return <p>item</p>;
        })}
      </Wrapper>
    </section>
  );
};
```

Next an Item cpmnt is created to deconstruct the objects from the array.
```React
const Item = ({icon, label, value, color})
```

Then the return was constructed.
```React
  return <article className="item">
    <span className={color}>{icon}</span>
    <div>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </article>
}
```

To render on the screen the <p>item</p> is replaced with <item/> and the spread operator is used to copy all the properties inside the item(icon ,label, value, color) where they are immediately destructured (shown above) and then displayed to the screen.
```React
      <Wrapper className="section-center">
        {items.map((item) => {
          return <Item key={item.id} {...item}></Item>;
        })}
      </Wrapper>
```

Next the user component was constructed that consisted of the User and Followers components.
```React
const User = () => {
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Card />
        <Followers />
      </Wrapper>
    </section>
  );
};
```

Now properties are deconstructed from the mock data to pull out desired data from githubUser.
```React
const Card = () => {
  const { githubUser } = React.useContext(GithubContext);
  const {
    avatar_url,
    html_url,
    name,
    company,
    blog,
    bio,
    location,
    twitter_username,
  } = githubUser;
```

Next the return was constructed.
```React
return (
    <Wrapper>
      <header>
        <img src={avatar_url} alt={name} />
        <div>
          <h4>{login || "stranger"}</h4>
          <p>@{twitter_username || "Sprucey Baby"}</p>
        </div>
        <a href={html_url}>follow</a>
      </header>
      <p className="bio">{bio}</p>
      <div className="links">
        <p>
          <MdBusiness />
          {company}
        </p>
        <p>
          <MdLocationOn />
          {location || "earth"}
        </p>
        <a href={`https://${blog}`}>
          <MdLink />
        </a>
      </div>
    </Wrapper>
  );
```

Next the followers component is worked on.
```React
const Followers = () => {
  const { followers } = React.useContext(GithubContext);
  console.log(followers);
  return (
    <Wrapper>
      <div className="followers">
        {followers.map((follower, index) => {
          const { avatar_url: img, html_url, login } = follower;
          return (
            <article key={index}>
              <img src={img} alt={login} />
              <div>
                <h4>{login}</h4>
                <a href={html_url}>{html_url}</a>
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};
```

The repos component was worked on next starting by making the repos array value (which contains all the mock data) available from the global state.
```React
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);
  return <ExampleChart />;
};
```

Next, the chart that was brought in from the fusion charts example code is styled(not shown). Next the Repos is reconfigured to create the chart.
```React
const ChartComponent = ({data}) => {
  return <ReactFC {...chartConfigs} />;
};

const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);
  const chartData = [
    {
      label: "HTML",
      value: "13",
    },
    {
      label: "CSS",
      value: "23",
    },
    {
      label: "JavaScript",
      value: "45",
    },
    {
      label: "React",
      value: "40",
    },
  ];
  return (
    <section className="section">
      <Wrapper className="section-center">
        <ExampleChart data={chartData} />;
      </Wrapper>
    </section>
  );
};
```

Next a pie chart is created to display the data.
```React
// Step 1 - Include react
import React from "react";

// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Most commonly used language",
        //Set the chart subcaption
        // subCaption: "per repo",
        // //Set the x-axis name
        // xAxisName: "Language",
        // //Set the y-axis name
        // yAxisName: "Repos",
        // numberSuffix: "",
        //Set the theme for your chart
        theme: "fusion",
        decimals: 1,
        pieRadius: "35%",
        palleteColors: "#f0db4f, #b3f5, #f4cc,#33cc",
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;



  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} />; */}
        <Pie3D data={chartData} />
      </Wrapper>
    </section>
  );
```

Next the repos array was iterated over to deconstruct the language property from each of the arrays object items.
```React
  let languages = repos.reduce((total, item) => {
    // console.log(item);
    const { language } = item;
    console.log(language);
    return total;
  }, {});
```

To remove the null response from the responses list a conditional was used.
```React
    if (!language) return total;
```

Next the languages were tracked and hard coded with a starting value of 30.
```React
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);
  let languages = repos.reduce((total, item) => {
    // console.log(item);
    const { language } = item;
    if (!language) return total;
    console.log(language);
    total[language] = 30;
    return total;
  }, {});
```

Next, properties that are on the object will be counted and those that are not will be used to create a new instance of the property on the object.
```React
  let languages = repos.reduce((total, item) => {
    const { language } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = 1;
    } else {
      total[language] = total[language] + 1;
    }
```

Next the returned values are put inside of an object.
```React
   total[language] = { label: language, value: 1 };
```

Now the same is done if the instance is already on the object with only the value property being changed by +1.
```React
  if (!total[language]) {
      total[language] = { label: language, value: 1 };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
      };
    }
```

Next, a limit of 5 is placed on the languages array to limit the slices in the pie chart to 5 total. This is done by first reformatting the objects to an array.
```React
languages = Object.values(languages);
```
 
Next sorting is carried out to only allow the top 5 highest returned values to be displayed to the pie chart.
```React
  languages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
```

Next the pie chart is set to display the labeled data taken from mockRepos.
```React
        <Pie3D data={languages} />
```

Next the donut chart was set up.
```React
      <Wrapper className="section-center">
        <Doughnut2D data={chartData} />
        <Pie3D data={languages} />
      </Wrapper>

import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Stars per language",
        theme: "candy",
        decimals: 0,
        doughnutRadius: "35%",
        showPercentValues: 0,
        // palleteColors: "#f0db4f, #b3f5, #f4cc,#33cc",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
```

Next the calculations for displaying total repo stars is setup.
```React
    const { language, stars: stargazer_count } = item;

    const { language, stargazers_count } = item;
    if (!language) return total;

    // console.log(language);
    if (!total[language]) {
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count,
      };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
```

With the stars count comes a renaming of languages into mostUsed since their are now multiple properties present.
```React
  const mostUsed = Object.values(languages)

      <Wrapper className="section-center">
        <Doughnut2D data={mostUsed} />
        <Pie3D data={mostUsed} />
      </Wrapper>
```

Next the number of stars are sorted and returned based on their overall #.
```React
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    });
```

Next I iterated using map and set up a new order, why? Because I needed stars to be in the value now instead of the languages. STARS NOT LANGUAGES! The chart is not looking for stars:# it is looking for value:# so I had to copy over the stars values like this: {label: "HTML", value: 34, stars: 34} 
```React
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    });
  console.log(mostPopular);
```

Now the values are not the language values any longer, but the stars values instead. Next slice is used once again to limit the total as was done above(not shown here). 

Next the column and bar charts were set up(not shown). After these two graphs are displayed using the chartData then the repos array can be reiterated over once more.
```React
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      return total;
    },
    { stars: {}, forks: {} }
  );
  console.log(stars);
```

Now the data object is transformed into an array and only the top 5 repos with the most stars are displayed.
```React
  stars = Object.values(stars).slice(-5).reverse();
  
          <Column3D data={stars} />
```


Next the same process is carried out for forks as well.
```React
    total.forks[forks] = { label: name, value: forks };

  forks = Object.values(forks).slice(-5).reverse();
  
        <Bar3D data={forks} />
```

Now the dashboard has been built out using the mock data and can start to be switched over to using fetched data instead. This process is started by implementing the search form component.
```React
const Search = () => {
  const [user, setUser] = React.useState("");
  //get things from global context
  const handleSubmit = (e) => {
    console.log(user);
  };
  return (
    <section className="section">
      <Wrapper className="section-center">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <MdSearch />
            <input type="text" placeholder="enter github user" />
            <button type="submit">search</button>
          </div>
        </form>
       <h3>requests : 60 / 60</h3>
      </Wrapper>
    </section>
  );
};
```

Next the search input is made to update as the user types by controlling the input.
```React
            <input
              type="text"
              placeholder="enter github user"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
```

Next the logic is setup to retrieve the amount of request remaining upon page loading and if no requests are available, display an error.
```React
  const [requests, setRequests] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining)
        if(remaining === 0){

        }
      })
```

Now request is deconstructed inside of Search from the global context file(not shown). It is then used to dynamically render the user requests.
```React
        <h3>requests : {requests} / 60</h3>
```

If no more request are available, the search button is made hidden.
```React
            {requests > 0 && <button type="submit">search</button>}
```

Next the search form error is set up for when a user does not exists or request count is 0.
```React
  const [error, setError] = useState({ show: false, msg: "" });
  
function toggleError(show, msg){
    setError({show, msg})
}


        setRequests(remaining);
        if (remaining === 0) {
          toggleError(
            true,
            "sorry, you have exceeded your hourly requests amount from the GitHub API, you have to wait 1 hour to continue using the app."
          );
          
     <GithubContext.Provider value={{ githubUser, repos, followers, requests, error }}>
```

Next error is imported in(not shown) and made to show whenever the show property is true.
```React
      <Wrapper className="section-center">
        {error.show && (
          <ErrorWrapper>
            <p>{error.msg}</p>
          </ErrorWrapper>
        )}
 ```
 
 
Next the searchbar functionality is setup starting with making sure the search input is passed on.
```React
  const searchGithubUser = async (user) => {
    console.log(user);
  };
  
     if (user) {
      searchGithubUser(user);
```

The functionality of searchGithubUser was further setup next.
```React
  const searchGithubUser = async (user) => {
    //toggle error
    //setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(
        true,
        "That user cannot be found! Check your spelling or else you got ghosted!"
      );
    }
  };
```

At this point the search bar should be working to pull users from GitHub. Next a loading state is setup to deal with loading times during fetch requests.
```React
const Dashboard = () => {
  const { loading } = React.useContext(GithubContext);
  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className="loading-img" />
      </main>
    );
  } else {
    return (
      <main>
        <Navbar />
        <Search />
        <Info />
        <User />
        <Repos />
      </main>
    );
  }
};
```

Next the real followers and repos are fetched and used instead of the mock data.
```React
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      axios(`${rootUrl}/users/${login}/repos?per_page=50`).then((response) =>
        setRepos(response.data)
      );

      axios(`${followers_url}?per_page=50`).then((response) =>
        setFollowers(response.data)
      );
```

Now that the application is working a setup is done to ensure all data arrives back simultaneously by way of using Promise.allSettled().
```React
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=50`),
        axios(`${followers_url}?per_page=50`),
      ]).then((results) => {
        const [repos, followers] = results;
        const status = "fulfilled";
        if (repos.status === status) {
          setRepos(repos.value.data);
        }
        if (followers.status === status) {
          setFollowers(followers.value.data);
        }
      }).catch((err) => console.log(err));
```

Next the authentication portion of the project is worked on using Auth0 to implement the login screen: https://auth0.com/docs/quickstart/spa/react .
```React
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-4fnj19vb.us.auth0.com"
      clientId="3MmrQjD45htzC5lOyXZ910lbiuaWAawm"
      redirectUri={window.location.origin}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Next the login and logout functionality is added.
```React
const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } =
    useAuth0();
  return (
    <Wrapper>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        Log Out
      </button>
    </Wrapper>
  );
};
```

Next the login button is made to be hidden on the navbarif a user is already logged in.
```React
const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } =
    useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <Wrapper>
      {isUser && user.picture && <img src={user.picture} alt={user.name}></img>}
      {isUser && user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      {isUser ? (
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          Log Out
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </Wrapper>
  );
};
```

Next private routes are enabled.
```React
const PrivateRoute = ({children, ...rest}) => {
  const isUser = true;
  return <Route {...rest} render={()=>{
    return isUser ? children : <Redirect to='/login'></Redirect>
  }}>
    private
  </Route>;
};

        <PrivateRoute exact path="/">
          <Dashboard></Dashboard>
        </PrivateRoute>
```

Next the user is checked to see if logged in and if so the dashboard is displayed.
```React
const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();


const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="github user" />
        <h1>github user</h1>
        <button className="btn" onClick={loginWithRedirect}>
          login / sign up
        </button>
      </div>
    </Wrapper>
  );
};
```

Next to allow the app to reach the dashboard after logging in the Wrapper is added. The app does not reach dash currently due to the isLoading state from the Auth0.
```React
function App() {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact={true}>
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}
```

This renders the AuthWrapper component to the screen which is thus worked on next.
```React
function AuthWrapper({ children }) {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt="spinner" />
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return <>{children}</>;
}
```

At this point logged in users should be routed to the dashboard. Next local storage is set up to persist logins across pages.
```React
    <Auth0Provider
      domain="dev-4fnj19vb.us.auth0.com"
      clientId="3MmrQjD45htzC5lOyXZ910lbiuaWAawm"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
```

***End walkthrough
