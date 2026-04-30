import React from "react";
import CustomCalendar from "./Calendar";
import Todo from "./Todo";

const MainPage = () => {
	return ( 
    <div className="mainpage-container">
      <CustomCalendar/>
      <Todo/>
    </div>
    
	);
};

export default MainPage;