//Elements
  //rule
  //formref
  //error-style

let GlobalRules
let GlobalRadioElements = []

var validate = function (formName, rules) {
  try {
    GlobalRules = rules
    let elements = document.querySelectorAll(`[formref='${formName}']`)
    let validateList = []
    for (let el = 0; el < elements.length; el++ ) {
      checkNode(elements[el],validateList)
    }
    checkRadioButtons(validateList)
    let all_validate = true
    for (let elem_val = 0; elem_val < validateList.length; elem_val++) {
      if (!validateList[elem_val]) {
        all_validate = false
        break
      }
    }
    if (all_validate) {
      return true
    } else {
      return false
    }
  } catch (err) { console.log(err) }
}

function checkRadioButtons(list) {
  if (GlobalRadioElements.length > 0) {
    let final_checking = []
    let groupedRadio = {}
    for (let el = 0; el < GlobalRadioElements.length; el++) {
      let element = GlobalRadioElements[el]
      let element_name = GlobalRadioElements[el].getAttribute('name')
      if (!groupedRadio[element_name]) {
        groupedRadio[element_name] = [element]
      } else {
        groupedRadio[element_name].push(element)
      }
    }
    let RadioValues = {}
    for (let key in groupedRadio) {
      for (let x = 0; x < groupedRadio[key].length; x++) {
        if (!RadioValues[key]) {
          RadioValues[key] = [groupedRadio[key][x].checked]
        } else {
          RadioValues[key].push(groupedRadio[key][x].checked)
        }
      }
    }
    let validRadioGroupNames = []
    let unValidRadioGroupNames = []
    for (let key in RadioValues) {
      let check = false
      for (let x = 0; x < RadioValues[key].length; x++) {
        if (RadioValues[key][x]) {
          check = true
        }
      }
      if (check) {
        validRadioGroupNames.push(key)
      } else {
        unValidRadioGroupNames.push(key)
      }
    }
    for (let x = 0; x < validRadioGroupNames.length; x++) {
      list.push(true)
    }
    for (let x = 0; x < unValidRadioGroupNames.length; x++) {
      list.push(false)
    }
    if (unValidRadioGroupNames.length > 0) {
      for (let x = 0; x < unValidRadioGroupNames.length; x++) {
        let elements = document.querySelectorAll(`[k-radio-group='${unValidRadioGroupNames[x]}']`)
        for (let i = 0; i < elements.length; i++) {
          returnUnvalidatedElement(elements[i])
        }
      }
    }
  }
}

function getRule (ruleName) {
  for(let key in GlobalRules){
    if (key === ruleName) {
      return GlobalRules[key]
    }
  }
}

//regex list
function regexList () {
  let regList = {
    email:/\S+@\S+\.\S+/
  }
  return regList
}

function checkNode (element, list) {
  let ruleName = element.getAttribute('rule')
  let element_tupe = element.getAttribute('type')
  clearClass(element)
  if (element_tupe === 'radio') {
    GlobalRadioElements.push(element)
  }
  validateNode(element,ruleName, list)
}

function returnUnvalidatedElement (element) {
  let errorStyle = element.getAttribute('error-style')
  if (errorStyle) {
    element.classList.add(errorStyle)
  } else {
    return false
  }
}

function ruleCheckRequired(element) {
  if(!element.value || element.value.length === 0){
    returnUnvalidatedElement(element)
    return false
  } else {
    return true
  }
}

function ruleCheckLength (element, length) {
  if (element.value.length > length) {
    returnUnvalidatedElement(element)
    return false
  } else {
    return true
  }
}

function ruleCheckEmail (element, value) {
  if (value) {
    if (!regexList().email.test(element.value)) {
      returnUnvalidatedElement(element)
      return false
    } else {
      return true
    }
  }
}

function clearClass(element) {
  let errorStyle = element.getAttribute('error-style')
  if (errorStyle) {
    element.classList.remove(errorStyle)
  }
}

function validateNode (element, ruleName, list) {
  let ruleList = getRule(ruleName)
  for(let key in ruleList){
    if (key === 'required') {
      if (ruleList[key] === true) {
        let validated = ruleCheckRequired(element,ruleList[key])
        list.push(validated)
      }
    }
    else if (key === 'length') {
      let validated = ruleCheckLength(element,ruleList[key])
      list.push(validated)
    }
    else if (key === 'email') {
      let validated = ruleCheckEmail(element,ruleList[key])
      list.push(validated)
    }
  }
}
export default validate


