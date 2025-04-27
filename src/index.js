const employees = [
  {
    id: 2,
    name: 'John',
    job: 'Frontend Developer',
    companyId: 9,
    managerId: 10,
  },
  {
    id: 8,
    name: 'Amy',
    job: 'User Interface Designer',
    companyId: 1,
    managerId: 13,
  },
  {
    id: 17,
    name: 'Liam',
    job: 'Backend Developer',
    companyId: 4,
    managerId: 60,
  },
  {
    id: 50,
    name: 'Emma',
    job: 'CTO',
    companyId: 1,
    managerId: null,
  },
  {
    id: 41,
    name: 'Sophia',
    job: 'DevOps Engineer',
    companyId: 1,
    managerId: 13,
  },
  {
    id: 32,
    name: 'Mia',
    job: 'Fullstack Developer',
    companyId: 9,
    managerId: 2,
  },
  {
    id: 21,
    name: 'Adam',
    job: 'Project Manager',
    companyId: 9,
    managerId: null,
  },
  {
    id: 22,
    name: 'Noah',
    job: 'Security Engineer',
    companyId: 4,
    managerId: 60,
  },
  {
    id: 10,
    name: 'John',
    job: 'Project Manager',
    companyId: 1,
    managerId: 50,
  },
  {
    id: 60,
    name: 'Lucas',
    job: 'Technical Lead',
    companyId: 4,
    managerId: 75,
  },
  {
    id: 35,
    name: 'Ethan',
    job: 'Data Scientist',
    companyId: 9,
    managerId: 21,
  },
  {
    id: 75,
    name: 'Michael',
    job: 'CEO',
    companyId: 4,
    managerId: null,
  },
  {
    id: 13,
    name: 'Olivia',
    job: 'Fullstack Developer',
    companyId: 1,
    managerId: 10,
  },
];

const companies = [
  {
    id: 1,
    name: 'Cloud Innovations',
  },
  {
    id: 4,
    name: 'Fast Code Solutions',
  },
  {
    id: 9,
    name: 'Pixel Systems',
  },
];

// 1
const companiesMap = companies.reduce(function (companyDictionary, company) {
  companyDictionary[company.id] = company;
  return companyDictionary;
}, {});

function getCompanyById(id) {
  return companiesMap[id] || null;
}

console.log(getCompanyById(4));

// 2
function getMostCommonJobs() {
  const jobCounts = employees.reduce(function (employeesDictionary, employee) {
    employeesDictionary[employee.job] ??= 0;
    employeesDictionary[employee.job] += 1;
    return employeesDictionary;
  }, {});

  // Find maximum frequency
  const maxCount = Math.max(...Object.values(jobCounts));

  return Object.entries(jobCounts).reduce((result, [job, count]) => {
    if (count === maxCount) {
      result.push(job);
    }
    return result;
  }, []);
}

console.log(getMostCommonJobs());

// 3
function getCompaniesWithEmployees() {
  const employeesByCompany = employees.reduce((employeesDictionary, employee) => {
    if (!employeesDictionary[employee.companyId]) {
      employeesDictionary[employee.companyId] = [];
    }
    employeesDictionary[employee.companyId].push(employee);
    return employeesDictionary;
  }, {});

  return Object.entries(employeesByCompany).reduce(
    (companiesList, [companyId, companyEmployees]) => {
      const company = companiesMap[companyId];
      if (company) {
        companiesList[company.name] = companyEmployees;
      }
      return companiesList;
    },
    {},
  );
}

console.log(getCompaniesWithEmployees());

// 4
function getTopManager(employeeId, employeesMap = null) {
  if (!employeesMap) {
    employeesMap = employees.reduce((employeesDictionary, employee) => {
      employeesDictionary[employee.id] = employee;
      return employeesDictionary;
    }, {});
  }

  const currentEmployee = employeesMap[employeeId];

  if (!currentEmployee || currentEmployee.managerId === null) {
    return currentEmployee || null;
  }

  return getTopManager(currentEmployee.managerId, employeesMap);
}
console.log(getTopManager(32));

//5
function getDirectEmployeesByManager(managerId) {
  return employees.filter((employee) => employee.managerId === managerId);
}

console.log(getDirectEmployeesByManager(10));

//6
function getEmployeesGroupedByManagers(employeesList) {
  const employeesMap = employeesList.reduce((employeesDictionary, employee) => {
    employeesDictionary[employee.id] = { ...employee, employees: [] };
    return employeesDictionary;
  }, {});

  employeesList.forEach((employee) => {
    if (employee.managerId !== null) {
      const manager = employeesMap[employee.managerId];
      if (manager) {
        manager.employees.push(employeesMap[employee.id]);
      }
    }
  });

  return employees.reduce((topLevelEmployees, employee) => {
    if (employee.managerId === null) {
      topLevelEmployees.push(employeesMap[employee.id]);
    }
    return topLevelEmployees;
  }, []);
}
console.log('6th task')
console.log(getEmployeesGroupedByManagers(employees));

// 7
const products = [
  'Wireless Bluetooth Headphones',
  'Bluetooth Wireless Earbuds',
  'Noise Cancelling Bluetooth Headphones',
  'Gaming Mouse with RGB Lights',
  'RGB Gaming Mouse with Programmable Buttons',
  'Bluetooth Noise Cancelling Earbuds',
  'Wireless Noise Cancelling Headphones',
  'Ergonomic RGB Gaming Mouse with Extra Buttons',
  'Programmable RGB Wireless Gaming Mouse with Adjustable DPI',
  'High-Performance Wireless Bluetooth Noise Cancelling Headphones',
];

// get normalized words from a product title
const getWords = (product) => {
  return product.toLowerCase().split(' ');
};

// function to calculate similarity between two products
const calculateSimilarity = (productOne, productTwo) => {
  const productOneWords = getWords(productOne);
  const productTwoWords = getWords(productTwo);

  // find unique shared words
  const productTwoWordsSet = new Set(productTwoWords);
  const sharedWords = productOneWords.filter((word) => productTwoWordsSet.has(word));

  // similarity based on shorter product length
  const shorterLength = Math.min(productOneWords.length, productTwoWords.length);
  return sharedWords.length / shorterLength;
};

const getSimilarProducts = (products, threshold) => {
  const result = [];

  // Compare each product with every other product
  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      const similarity = calculateSimilarity(products[i], products[j]);

      if (similarity >= threshold) {
        result.push({
          productOne: products[i],
          productTwo: products[j],
          similarity: Math.round(similarity * 100) / 100,
        });
      }
    }
  }

  return result;
};

const similarProducts = getSimilarProducts(products, 0.8);
console.log(similarProducts);
