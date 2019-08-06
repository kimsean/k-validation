//Elements
  //rule
  //formref
  //error-style

let GlobalRules
var validate = function (formName, rules) {
  try {
    GlobalRules = rules
    let elements = document.querySelectorAll(`[formref='${formName}']`)
    for (let el = 0; el < elements.length; el++ ) {
      checkNode(elements[el])
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

function checkNode (element) {
  let ruleName = element.getAttribute('rule')
  if (element.nodeName === 'INPUT') {
    validateInputNode(element,ruleName)
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
    return returnUnvalidatedElement(element)
  }
}

function ruleCheckLength (element, length) {
  if (element.value.length > length) {
    return returnUnvalidatedElement(element)
  }
}

function ruleCheckEmail (element, value) {
  if (value) {
    if (!regexList().email.test(element.value)) {
      return returnUnvalidatedElement(element)
    }
  }
}


function validateInputNode (element, ruleName) {
  let ruleList = getRule(ruleName)
  for(let key in ruleList){
    if (key === 'required') {
      if (ruleList[key] === true) {
        ruleCheckRequired(element,ruleList[key])
      }
    }
    if (key === 'length') {
      ruleCheckLength(element,ruleList[key])
    }
    if (key === 'email') {
      ruleCheckEmail(element,ruleList[key])
    }
  }
}
export default validate