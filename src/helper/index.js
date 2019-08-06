//Elements
  //rule
  //formref
  //error-style

let GlobalRules
var validate = function (formName, rules) {
  try {
    GlobalRules = rules
    let elements = document.querySelectorAll(`[formref='${formName}']`)
    let validateList = []
    for (let el = 0; el < elements.length; el++ ) {
      checkNode(elements[el],validateList)
    }
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
  clearClass(element)
  if (element.nodeName === 'INPUT') {
    validateInputNode(element,ruleName, list)
  }
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

function validateInputNode (element, ruleName, list) {
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


