import React from "react";
import "./UseCustomLoader.css";

const UseCustomLoader = ({ componentName }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-start">
        <section>
          <div className="sk-circle-bounce">
            <div className="sk-child sk-circle-1"></div>
            <div className="sk-child sk-circle-2"></div>
            <div className="sk-child sk-circle-3"></div>
            <div className="sk-child sk-circle-4"></div>
            <div className="sk-child sk-circle-5"></div>
            <div className="sk-child sk-circle-6"></div>
            <div className="sk-child sk-circle-7"></div>
            <div className="sk-child sk-circle-8"></div>
            <div className="sk-child sk-circle-9"></div>
            <div className="sk-child sk-circle-10"></div>
            <div className="sk-child sk-circle-11"></div>
            <div className="sk-child sk-circle-12"></div>
          </div>
        </section>
      </div>
      <span className="text-sm font-semibold">{componentName}</span>
    </div>
  );
};

export default UseCustomLoader;
