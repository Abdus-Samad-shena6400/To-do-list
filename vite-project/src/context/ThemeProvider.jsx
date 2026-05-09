import React from "react";
import ThemeContext from "./ThemeContext";

class ThemeProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      theme: "light",
    };
  }

  componentDidMount() {
    const savedTheme = localStorage.getItem("theme");

    this.setState({ theme: savedTheme });

    
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  changeTheme = (theme) => {
    this.setState({ theme });
    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", theme);
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          changeTheme: this.changeTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;