import React from 'react'
import { BaseUrl } from '../services/baseUrl';

function SingCard({project}) {
  return (
    <div>
      {
          <div className="mainCard mb-5 mt-3">
            <div class="card">
              <div class="card-details">
                <img src={project?`${BaseUrl}/uploads/${project.projectImage}`:<p>"no videos found"</p>} alt="" />
                <p class="text-title">{project.title}</p>
              </div>

              <button class="card-button">More info</button>
            </div>
          </div>
}
    </div>
  );
}

export default SingCard