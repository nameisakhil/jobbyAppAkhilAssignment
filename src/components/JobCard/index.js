import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    componyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="compony-profile">
          <img src={componyLogoUrl} className="compony-logo" alt="logo" />
          <div className="compony-title-rating-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-package-container">
          <div className="location-type-container">
            <div className="location-container">
              <MdLocationOn className="symbol" />
              <p className="location">{location}</p>
            </div>
            <div className="type-container">
              <BsFillBriefcaseFill className="symbol" />
              <p className="type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr" />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="description"> {jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
