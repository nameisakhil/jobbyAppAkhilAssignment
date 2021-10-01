import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {RiShareBoxFill} from 'react-icons/ri'

import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailsSection extends Component {
  state = {
    jobsData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedDataJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills,
    lifeAtCompanyDescription: data.life_at_company.description,
    lifeAtCompanyImageUrl: data.life_at_company.image_url,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.ration,
    title: data.title,
  })

  getFormattedDataSimilarJobs = data => ({
    companyLogoUrlSimilar: data.company_logo_url,
    employmentTypeSimilar: data.employment_type,
    idSimilar: data.id,
    jobDescriptionSimilar: data.job_description,
    locationSimilar: data.location,
    ratingSimilar: data.ration,
    titleSimilar: data.title,
  })

  getJobsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jobby_jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedDataJobDetails(
        fetchedData.job_details,
      )
      const similarJobsUpdatedData = fetchedData.similar_jobs.map(eachItem =>
        this.getFormattedDataSimilarJobs(eachItem),
      )

      this.setState({
        jobsData: updatedData,
        similarJobsData: similarJobsUpdatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="jobs-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="error-view-image"
      />
      <h1 className="jobs-not-found-heading">Product Not Found</h1>
      <Link to="/jobs">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  skillsListItem = skills => (
    <li className="skills-item-container">
      <img src={skills.image_url} className="skills-img" alt="skills-logo" />
      <p className="skills-name">{skills.name}</p>
    </li>
  )

  renderJobDetailsView = () => {
    const {jobsData, similarJobsData} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobsData

    return (
      <div className="jobs-detailed-view-section">
        <div className="jobs-detail-container">
          <div className="compony-profile">
            <img src={companyLogoUrl} className="compony-logo" alt="logo" />
            <div className="compony-title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
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
            <div className="description-heading-container">
              <h1 className="description-heading">Description</h1>
              <Link to={companyWebsiteUrl} className="link-item-detail-section">
                <button type="button" className="visit-btn">
                  Visit <RiShareBoxFill className="share-icon" />
                </button>
              </Link>
            </div>

            <p className="description"> {jobDescription}</p>
          </div>
          <div className="skills-main-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(skill => this.skillsListItem(skill))}
            </ul>
          </div>
          <div className="life-at-company">
            <div>
              <h1 className="life-at-company-heading">Life At Company</h1>
              <p className="life-at-company-description">
                {lifeAtCompanyDescription}
              </p>
            </div>
            <img
              src={lifeAtCompanyImageUrl}
              alt="life at company"
              className="  "
            />
          </div>
        </div>
        <div className="similar-jobs-section">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobsData.map(eachSimilarJob => (
              <SimilarJobsCard
                jobDetails={eachSimilarJob}
                key={eachSimilarJob.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobDetailsSection
