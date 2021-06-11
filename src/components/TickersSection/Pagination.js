import React from "react";

export default function PaginationSection(props) {
  return (
    <div className="flex mt-3">
      <button
        onClick={props.prevPage}
        className="text-gray-500 bg-blue-50 border-blue-100 border-2 border-solid rounded-l-lg py-1 px-2 focus:outline-none active:bg-blue-100"
      >
        <svg
          className="h-5 w-5 fill-current"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 443.52 443.52"
        >
          <path
            d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8
			c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712
			L143.492,221.863z"
          />
        </svg>
      </button>
      <div className="flex justify-center items-center text-gray-500 bg-blue-50 border-blue-100 border-t-2 border-b-2 border-solid py-1 px-3 text-lg">
        <span>{props.page}</span>
      </div>
      <button
        onClick={props.nextPage}
        className="text-gray-500 bg-blue-50 border-blue-100 border-2 border-solid rounded-r-lg py-1 px-2 focus:outline-none active:bg-blue-100"
      >
        <svg
          className="h-5 w-5 fill-current transform rotate-180"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 443.52 443.52"
        >
          <path
            d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8
			c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712
			L143.492,221.863z"
          />
        </svg>
      </button>
    </div>
  );
}
