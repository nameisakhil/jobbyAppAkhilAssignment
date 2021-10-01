import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'

import './index.css'

const typeOfEmployment = [
  {
    name: 'Full Time',
    categoryId: '1',
  },
  {
    name: 'Part Time',
    categoryId: '2',
  },
  {
    name: 'Freelance',
    categoryId: '3',
  },
  {
    name: 'Internship',
    categoryId: '4',
  },
]

const salaryRange = [
  {
    optionId: '10',
    salary: '10LPA',
  },
  {
    optionId: '20',
    salary: '20LPA',
  },
  {
    optionId: '30',
    salary: '30LPA',
  },
  {
    optionId: '40',
    salary: '40LPA',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeTypeOfEmployment: '',
    activeSalaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jobby_jwt_token')

    const {activeTypeOfEmployment, activeSalaryRange, searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeTypeOfEmployment}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        componyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeActiveTypeOfEmployment = activeTypeOfEmployment => {
    this.setState({activeTypeOfEmployment}, this.getJobDetails)
  }

  changeActiveSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRange}, this.getJobDetails)
  }

  enterSearchInput = () => {
    this.getJobDetails()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  onClickRetry = () => {
    this.setState(
      {
        activeTypeOfEmployment: '',
        activeSalaryRange: '',
        searchInput: '',
      },
      this.getJobDetails,
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobs-failure-img"
        alt="job failure"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <Link to="/jobs">
        <button
          type="button"
          className="retry-button"
          onClick={this.onClickRetry}
        >
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-jobs-container">
        <ul className="jobs-list">
          {jobsList.map(job => (
            <JobCard jobDetails={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any Jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeSalaryRange, activeTypeOfEmployment, searchInput} = this.state

    return (
      <div className="all-jobs-section">
        <FiltersGroup
          searchInput={searchInput}
          activeSalaryRange={activeSalaryRange}
          activeTypeOfEmployment={activeTypeOfEmployment}
          salaryRange={salaryRange}
          typeOfEmployment={typeOfEmployment}
          changeSearchInput={this.changeSearchInput}
          changeActiveSalaryRange={this.changeActiveSalaryRange}
          changeActiveTypeOfEmployment={this.changeActiveTypeOfEmployment}
          enterSearchInput={this.enterSearchInput}
        />
        {this.renderAllJobs()}
      </div>
    )
  }
}

export default AllJobsSection
