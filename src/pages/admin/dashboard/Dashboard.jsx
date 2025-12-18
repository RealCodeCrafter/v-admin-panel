import React from 'react';
import './dashboard.scss';
import { useGetDashboardQuery } from '../../../context/api/dashboardApi';

const Dashboard = () => {
  const { data } = useGetDashboardQuery()

  const maxValue = Math.max(...(data?.data?.weeklyUsage?.map(d => d?.usedCodes) || [1]));

  return (
    <div className="dashboard">
      <div className="dashboard__stats">
        <div className="dashboard__stats-card">
          <div className="dashboard__stats-card__icon" style={{ background: `#6366f120`, color: "#6366f1" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="dashboard__stats-card__content">
            <p className="dashboard__stats-card__label">Total Codes</p>
            <h3 className="dashboard__stats-card__value">{data?.data?.totals?.totalCodes}</h3>
          </div>
        </div>

        <div className="dashboard__stats-card">
          <div className="dashboard__stats-card__icon" style={{ background: `#10b98120`, color: "#10b981" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="dashboard__stats-card__content">
            <p className="dashboard__stats-card__label">Used Codes</p>
            <h3 className="dashboard__stats-card__value">{data?.data?.totals?.usedCodes}</h3>
          </div>
        </div>

        <div className="dashboard__stats-card">
          <div className="dashboard__stats-card__icon" style={{ background: `#f59e0b20`, color: "#f59e0b" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="dashboard__stats-card__content">
            <p className="dashboard__stats-card__label">Active Users</p>
            <h3 className="dashboard__stats-card__value">{data?.data?.totals?.activeUsers}</h3>
          </div>
        </div>

        <div className="dashboard__stats-card">
          <div className="dashboard__stats-card__icon" style={{ background: `#8b5cf620`, color: "#8b5cf6" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="dashboard__stats-card__content">
            <p className="dashboard__stats-card__label">Available Codes</p>
            <h3 className="dashboard__stats-card__value">{data?.data?.totals?.availableCodes}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard__grid">
        <div className="dashboard__chart">
          <div className="dashboard__grid-card">
            <div className="dashboard__grid-card__header">
              <h3 className="dashboard__grid-card__title">Weekly Usage</h3>
              <button className="dashboard__grid-card__header-btn">Last 7 days</button>
            </div>
            <div className="dashboard__grid-chart">
              <div className="dashboard__grid-chart__bars">
                {data?.data?.weeklyUsage?.map((item, index) => (
                  <div key={index} className="dashboard__grid-chart__bar-wrapper">
                    <div className="dashboard__grid-chart__bar-container">
                      {/* <h2 className='dashboard__grid-chart__bar-container-title'>{item?.usedCodes}</h2> */}
                      <div
                        className="dashboard__grid-chart__bar"
                        style={{ height: `${(item?.usedCodes / maxValue) * 100}%` }}
                      >
                        <span className="dashboard__grid-chart__bar-container-title">{item?.usedCodes}</span>
                      </div>
                    </div>
                    <span className="dashboard__grid-chart__label">{item?.dayLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__activity">
          <div className="dashboard__activity-card">
            <div className="dashboard__activity-card__header">
              <h3 className="dashboard__activity-card__title">Recent Activity</h3>
              <button className="dashboard__activity-card__link">View all</button>
            </div>
            <div className="dashboard__activity-card-activity">
              {data?.data?.recentActivity?.map((activity, index) => (
                <div key={index} className="dashboard__activity-card-activity__item">
                  <div className="dashboard__activity-card-activity__avatar">
                    {activity?.user?.firstName?.charAt(0)}
                  </div>
                  <div className="dashboard__activity-card-activity__content">
                    <p className="dashboard__activity-card-activity__text">
                      <span className="dashboard__activity-card-activity__user">{activity?.user?.firstName}</span>
                      <span className="dashboard__activity-card-activity__time">{activity?.usedAt?.slice(0, 10)}</span>
                    </p>
                    <span className="dashboard__activity-card-activity__code">{activity?.value}</span>
                    <p className="dashboard__activity-card-activity__gift">{activity?.gift}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;