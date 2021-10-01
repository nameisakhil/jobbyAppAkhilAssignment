import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrlSimilar,
    employmentTypeSimilar,
    jobDescriptionSimilar,
    locationSimilar,
    ratingSimilar,
    titleSimilar,
  } = jobDetails

  return (
    <li className="similar-job-list-item">
      <div className="company-logo-job-type-container">
        <img
          src={companyLogoUrlSimilar}
          className="company-logo"
          alt="company logo"
        />
        <div className="job-type-container-similar">
          <h1 className="similar-jobs-type-heading">{titleSimilar}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating-similar">{ratingSimilar}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-heading">Description</h1>
      <p className="similar-description">{jobDescriptionSimilar}</p>
      <div className="location-type-container">
        <div className="location-container">
          <MdLocationOn className="icon" />
          <p className="location-similar">{locationSimilar}</p>
        </div>
        <div className="type-container-similar">
          <BsFillBriefcaseFill className="icon" />
          <p className="type-similar">{employmentTypeSimilar}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsCard
