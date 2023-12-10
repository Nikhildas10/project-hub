import React from 'react'

const Page404 = () => {
    let starContainer = document.querySelector(".stars");
if(starContainer){

  for (let i = 0; i < 100; i++) {
    starContainer.innerHTML += `<div class="star"></div>`;
  }
}

  return (
    <div>
      <div class="wrapper">
        <div class="text_group">
          <p class="text_404">404</p>
          <p class="text_lost">
            The page you are looking for <br />
            has been lost in space.
          </p>
        </div>
        <div class="window_group">
          <div class="window_404">
            <div class="stars"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page404