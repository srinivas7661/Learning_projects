import React from "react";
import { history } from "../../managers/history";
const Category = (props) => {
  const handleConnect = (id) => {
    history.push("/create-item/" + id);
  };
  return (
    <div className="bg-main bg-cover min-h-screen text-white pb-13">
      <div className="mb-0 container max-w-lg1 m-auto">
        <div className="font-black font-EurostileExtended text-left text-white text-ft18 pt-10 mobile:text-ft22 mobile:pl-7.5 tablet:px-8">
          CREATE NEW ITEM
        </div>
        <div className=" font-EurostileExtended text-left text-blue-80 text-ft8 mobile:text-ft5 mobile:pl-12 tablet:px-8">
          Select a Category
        </div>
        {/* cards grid */}

        {/* <div class="container my-16 mx-auto px-4 md:px-12"> */}
        <div class="container my-3.5 mx-auto  ">
          {/* <div class="flex flex-wrap -mx-1 lg:-mx-4"> */}
          <div class="flex flex-wrap -mx-1 lg:-mx-4 tablet:px-6 tablet:mx-0">
            {props.category &&
              props.category.length >= 1 &&
              props.category?.map((item, index) => {
                return (
                  // <div class=" my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4 bg-black-80  rounded-lg  border-solid border-2 border-primary-50" key={index}>
                  <div
                    class="my-1  w-full md:w-fkx lg:my-4 lg:mx-4 mx-4 lg:w-ssx  bg-black-80  border-2 border-primary-50 group cursor-pointer transition duration-300 hover:transform hover:-translate-y-2  hover:shadow-card  border-transparent hover:border-current rounded-lg hover:border-grey-5 mobile:w-39 mobile:mb-4 tablet:mb-8"
                    onClick={() => handleConnect(item._id)}
                  >
                    <article class="overflow-hidden rounded-lg shadow-lg">
                      <a href="#">
                        <img
                          alt="Placeholder"
                          class="block h-65 w-full object-fill mobile:h-34"
                          src={item.imageUrl}
                        />
                      </a>

                      <header class="flex border-t-2 border-primary-50  group-hover:border-grey-5 items-center justify-between leading-tight py-1 md:px-4">
                        <h1 class="text-lg mobile:text-ft40 mobile:pt-1.75 mobile:pl-1.75">
                          <a
                            class="no-underline hover:underline text-black uppercase font-black"
                            href="#"
                          >
                            {item.categoryName}
                          </a>
                        </h1>
                      </header>

                      <footer class="flex items-center justify-between leading-none pt-1 pb-1  md:px-4">
                        {/* {data.pra} */}
                      </footer>
                    </article>
                  </div>
                );
              })}

            {/* <div class="mr-10 bg-black-80 w-full md:w-1/2 rounded-lg lg:mb-10 lg:px-0 lg:w-82.75 border-solid border-2 border-primary-50">
              <article class="overflow-hidden rounded-lg shadow-lg">
                <a href="#">
                  <img
                    alt="Placeholder"
                    class="block h-auto w-full"
                    src="https://picsum.photos/600/400/?random"
                  />
                </a>

                <header class="flex border-t-2 border-primary-50 items-center justify-between leading-tight py-1 md:px-4">
                  <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="#">
                      Article Title
                    </a>
                  </h1>
                </header>

                <footer class="flex items-center justify-between leading-none pt-1 pb-1  md:px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat, mauris in gravida finibus,

                </footer>
              </article>
            </div>

            <div class="mr-10 bg-black-80 w-full md:w-1/2 rounded-lg lg:mb-10 lg:px-0 lg:w-82.75 border-solid border-2 border-primary-50">
              <article class="overflow-hidden rounded-lg shadow-lg">
                <a href="#">
                  <img
                    alt="Placeholder"
                    class="block h-auto w-full"
                    src="https://picsum.photos/600/400/?random"
                  />
                </a>

                <header class="flex border-t-2 border-primary-50 items-center justify-between leading-tight py-1 md:px-4">
                  <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="#">
                      Article Title
                    </a>
                  </h1>
                </header>

                <footer class="flex items-center justify-between leading-none pt-1 pb-1  md:px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat, mauris in gravida finibus,

                </footer>
              </article>
            </div>

            <div class="mr-10 bg-black-80 w-full md:w-1/2 rounded-lg lg:mb-10 lg:px-0 lg:w-82.75 border-solid border-2 border-primary-50">
              <article class="overflow-hidden rounded-lg shadow-lg">
                <a href="#">
                  <img
                    alt="Placeholder"
                    class="block h-auto w-full"
                    src="https://picsum.photos/600/400/?random"
                  />
                </a>

                <header class="flex border-t-2 border-primary-50 items-center justify-between leading-tight py-1 md:px-4">
                  <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="#">
                      Article Title
                    </a>
                  </h1>
                </header>

                <footer class="flex items-center justify-between leading-none pt-1 pb-1  md:px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat, mauris in gravida finibus,

                </footer>
              </article>
            </div>

            <div class="mr-10 bg-black-80 w-full md:w-1/2 rounded-lg lg:mb-10 lg:px-0 lg:w-82.75 border-solid border-2 border-primary-50">
              <article class="overflow-hidden rounded-lg shadow-lg">
                <a href="#">
                  <img
                    alt="Placeholder"
                    class="block h-auto w-full"
                    src="https://picsum.photos/600/400/?random"
                  />
                </a>

                <header class="flex border-t-2 border-primary-50 items-center justify-between leading-tight py-1 md:px-4">
                  <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="#">
                      Article Title
                    </a>
                  </h1>
                </header>

                <footer class="flex items-center justify-between leading-none pt-1 pb-1  md:px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat, mauris in gravida finibus,

                </footer>
              </article>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
