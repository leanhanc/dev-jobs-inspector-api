const subDays = require('date-fns/sub_days');
const differenceInDays = require('date-fns/difference_in_calendar_days');

exports.timeDifferences = {
  all: 0,
  today: 1,
  yesterday: 2,
  this_week: 7,
  this_month: 30
};

exports.times = {
  all: null,
  today: subDays(new Date(), this.timeDifferences[0]),
  yesterday: subDays(new Date(), this.timeDifferences[1]),
  this_week: subDays(new Date(), this.timeDifferences[2]),
  this_month: subDays(new Date(), this.timeDifferences[3])
};

exports.filterByDate = (filter, jobsToEvaluate) => {
  const numberOfDaysToEvaluate = this.timeDifferences[filter];

  return jobsToEvaluate.filter(jobToEvaluate => {
    const evaluation = differenceInDays(
      new Date(),
      new Date(jobToEvaluate.created_at)
    );
    return numberOfDaysToEvaluate >= evaluation;
  });
};
