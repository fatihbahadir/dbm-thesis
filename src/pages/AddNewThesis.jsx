import React from "react";

const AddNewThesis = () => {
  return (
    <div className="w-full h-full flex pt-12 md:px-24">
      <div className="bg-white shadow-2xl rounded flex flex-col justify-center gap-8 w-full">
        <div className="w-full items-start border-b p-5 border-b-[#f9f9f9]">
          <h2 className="font-bold text-grayUpdated text-xl tracking-wider">
            Write Your Thesis
          </h2>
        </div>
        <div className="w-full flex flex-col gap-6 p-5">
        <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Thesis No</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
              <input
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Title</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
              <input
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">University</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
              <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              >
                <option>
                  Really long option that will likely overlap the chevron
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Institute</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              >
                <option>
                  Really long option that will likely overlap the chevron
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Thesis Type</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              >
                <option>
                  Really long option that will likely overlap the chevron
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Thesis Language</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              >
                <option>
                  Really long option that will likely overlap the chevron
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Number of Pages</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
              <input
                type="number"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Year</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
              <input
                type="number"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              />
            </div>
          </div>


          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Supervisor</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              >
                <option>
                  Really long option that will likely overlap the chevron
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>


          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Co-supervisor</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
            <select
                type="text"
                className="py-2 px-4 h-[42px] bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main"
              >
                <option>
                  Really long option that will likely overlap the chevron
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Thesis Abstract</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
              <textarea className="py-2 px-4 resize-none bg-[#fdfdff] border-[#e4e6fc] border transition-all rounded w-full outline-none  focus:border-main" />
            </div>
          </div>


          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Related Keywords</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
            <label
                className="inline-flex items-center mt-2 mr-3"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-600 accent-main"
                />
                <span className="ml-2">Keyword1</span>
              </label>
              <label
                className="inline-flex items-center mt-2 mr-3"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-600 accent-main"
                />
                <span className="ml-2">Keyword1</span>
              </label>
              <label
                className="inline-flex items-center mt-2"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-600 accent-main"
                />
                <span className="ml-2">Keyword1</span>
              </label>
                </div>  
          </div>

          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-3 text-left md:text-right pr-12">
              <label className="font-semibold">Subjects</label>
            </div>
            <div className="col-span-12 md:col-span-7 md:px-3">
            <label
                className="inline-flex items-center mt-2 mr-3"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-600 accent-main"
                />
                <span className="ml-2">Keyword1</span>
              </label>
              <label
                className="inline-flex items-center mt-2 mr-3"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-600 accent-main"
                />
                <span className="ml-2">Keyword1</span>
              </label>
              <label
                className="inline-flex items-center mt-2"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-600 accent-main"
                />
                <span className="ml-2">Keyword1</span>
              </label>
                </div>  
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-7 md:col-start-4 md:px-3">
            <button style={{boxShadow: '0 2px 6px #acb5f6'}} className="bg-main transition-all rounded py-2 hover:bg-mainHover px-8 text-white">
              Save
            </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewThesis;
