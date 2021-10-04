import {BsSearch} from 'react-icons/bs'

import Profile from '../Profile'
import './index.css'

const FiltersGroup = props => {
  const renderTypeOfEmploymentList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(type => {
      const {changeActiveTypeOfEmployment, activeTypeOfEmployment} = props
      const onClickTypeOfEmployment = () =>
        changeActiveTypeOfEmployment(type.employmentTypeId)

      const typeOfEmploymentClassName =
        activeTypeOfEmployment === type.employmentTypeId
          ? 'category-name active-category-name'
          : 'category-name'

      return (
        <li
          key={type.employmentTypeId}
          className="category-item"
          onClick={onClickTypeOfEmployment}
        >
          <input type="checkbox" id={type.employmentTypeId} />
          <label
            className={typeOfEmploymentClassName}
            htmlFor={type.employmentTypeId}
          >
            {type.label}
          </label>
        </li>
      )
    })
  }

  const renderTypeofEmployment = () => (
    <>
      <h1 className="employment-type-heading">Type Of Employment</h1>
      <ul className="employment-type-list">{renderTypeOfEmploymentList()}</ul>
    </>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(salary => {
      const {changeActiveSalaryRange, activeSalaryRange} = props

      const onClickSalaryRange = () =>
        changeActiveSalaryRange(salary.salaryRangeId)

      const salaryRangeClassName =
        activeSalaryRange === salary.salaryRangeId
          ? 'and-above active-salary'
          : 'and-above'

      return (
        <li
          className="salary-item"
          key={salary.salaryRangeId}
          onClick={onClickSalaryRange}
        >
          <input type="radio" id={salary.salaryRangeId} />
          <label
            htmlFor={salary.salaryRangeId}
            className={salaryRangeClassName}
          >
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="salary-range-container">
      <h1 className="salary-range-heading">Salary Range</h1>
      <ul className="salary-range-list">{renderSalaryRangeList()}</ul>
    </div>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      <div className="search-container">{renderSearchInput()}</div>
      <div className="profile-filter-container">
        <Profile />
        <hr className="hr-filter" />
        {renderTypeofEmployment()}
        <hr className="hr-filter" />
        {renderSalaryRange()}
      </div>
    </div>
  )
}

export default FiltersGroup
