const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];
  
  const spacer = (text) => {
    if(!text){
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
  }

  const findEmployeeByName = (person, array) => {
    for (let i = 0; i < array.length; i++) {
        let employee = array[i];
        if (employee.name === person) {
            return employee;
        }
    }
  }
  
  spacer('findEmployeeByName Moe')
  // given a name and array of employees, return employee
  console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
  spacer('')

  const findManagerFor = (person, array) => {
    for (let i = 0; i < array.length; i++) {
        let employee = array[i];
        if (employee.id === person.managerId) {
            return employee;
        }
    }
  }
  
  spacer('findManagerFor Shep')
  //given an employee and a list of employees, return the employee who is the manager
  console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
  spacer('')
  

  const findCoworkersFor = (person, array) => {
      //console.log(person.managerId)
    return array.filter(colleague => {
        return colleague.managerId && (colleague.managerId === person.managerId)
      })
  }
  spacer('findCoworkersFor Larry')
  
  //given an employee and a list of employees, return the employees who report to the same manager
  console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */
  spacer('');
  

  const findManagementChainForEmployee = (function (person, array) {
    let arr =[];
    return function (person, array) {
    // I need to do recursion and run this all the way up 
    // how do i stop the array from being overwritten?
    if (person.managerId) {
        for (let i = 0; i < array.length; i++) {
            let employee = array[i];
            if (employee.id === person.managerId) {
                arr.unshift(employee)
                findManagementChainForEmployee(employee, array)
            }
        }
    }
    return arr;}
  }())


  spacer('findManagementChain for moe')
  //given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
  console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
  spacer('');
  
  spacer('findManagementChain for shep Jr.')
  console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
  spacer('');

  const generateManagementTree = (array) => {
    array.forEach(employee => {
        employee.reports = []
        for (let i = 0; i < array.length; i++) {
            let person = array[i];
            if (employee.id === person.managerId) {
                employee.reports.push(person)
                }
        }
    });
    
  }

  // I need to s
  
  
  spacer('generateManagementTree')
  //given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
  console.log(JSON.stringify(generateManagementTree(employees), null, 2));
  /*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */
  spacer('');


const displayManagementTree = (function (person, array) {
    let count = '';
    return function (person, array) {
    // I need to do recursion and run this all the way up 
    // how do i stop the array from being overwritten?
    if (person.managerId) {
        for (let i = 0; i < array.length; i++) {
            let employee = array[i];
            if (employee.id === person.managerId) {
                count += '-'
                findManagementChainForEmployee(employee, array)
            }
        }
    }
    return `{$count}{$person}`;}
  }())

  spacer('displayManagementTree')
  //given a tree of employees, generate a display which displays the hierarchy
  displayManagementTree(generateManagementTree(employees));/*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */

