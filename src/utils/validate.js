/**
 * 密码格式验证
 * @param rule 验证规则（不少于6位）
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码长度不得小于6位'))
  } else {
    callback()
  }
}

/**
 * 手机号码格式验证
 * @param rule 验证规则
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateMobile = (rule, value, callback) => {
  var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
  if (!reg.test(value)) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}

/**
 * 身份证号码格式验证
 * @param rule 验证规则（是否满足18位）
 * @param value 需要验证的值
 * @param callback 回调函数
 */
export const validateIDCard = (rule, value, callback) => {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if (!reg.test(value)) {
    callback(new Error('身份证号码格式错误'))
  } else {
    callback()
  }
}

export const validateContact = function (rule, value, callback) {
  var d = {
    mobile: /^1[3|5|8|7|9]\d{9}$/,
    phone: /^0\d{2,3}-?\d{7,8}$/
  }
  var flag = typeof value == 'string' && (!!value.match(d.mobile) || !!value.match(d.phone))
  if (value === '') {
    callback(new Error('请输入联系方式!'))
  } else if (!flag) {
    callback(new Error('请输入11位手机号或****-*******'))
  } else {
    callback()
  }
}

export const validateTelephone = function (rule, value, callback) {
  var d = {
    phone: /^(\d{3,4}\-)?[1-9]\d{6,8}$/
  }
  var flag = typeof value == 'string' && (!!value.match(d.phone))
  if (value === '') {
    callback(new Error('请输入电话号码!'))
  } else if (!flag) {
    callback(new Error('号码格式：****-*******'))
  } else {
    callback()
  }
}
export const validateZipCode = function (rule, value, callback) {
  var patrn = /^\d{6}$/
  if (value == undefined) {
    callback(new Error('赋值异常!'))
  } else if (value === '') {
    callback(new Error('请输入邮编!'))
  } else if (!value.match(patrn)) {
    callback(new Error('请输入正确的邮编！'))
  } else {
    callback()
  }
}
// 数值
export const validateNumber = function (rule, value, callback) {
  var re = new RegExp('^[-+]?\\d+(\\.[\\d]{1,' + 6 + '})?$')
  //reg = /^[-+]?\d+(\.[\d]{1,3})?$/; 

  if (value == undefined) {
    callback(new Error('赋值异常!'))
  } else if (value === '') {
    callback(new Error('请输入!'))
  } else if (!re.test(value)) {
    callback(new Error('请输入数值！'))
  } else {
    callback()
  }
}
// 非空
export const validateString = function (rule, value, callback) {
  if (value == undefined) {
    callback(new Error('赋值异常!'))
  } else if (value === '') {
    callback(new Error('请输入!'))
  } else {
    callback()
  }
}

// 非空
export const validateStringLength6 = function (rule, value, callback) {
  if (value == undefined) {
    callback(new Error('赋值异常!'))
  } else if (value === '') {
    callback(new Error('请输入!'))
  } else if (value.length < 6) {
    callback(new Error('组织代码长度不能小于6位'))
  } else {
    callback()
  }
}

// 护照
export const validatePassport = function (rule, value, callback) {
  var patrn1 = /^[a-zA-Z]{5,17}$/
  var patrn2 = /^[a-zA-Z0-9]{5,17}$/
  if (value == undefined) {
    callback(new Error('赋值异常!'))
  } else if (value === '') {
    callback(new Error('请输入护照 !'))
  } else if (!value.match(patrn1) && !value.match(patrn2)) {
    callback(new Error('请输入正确的护照 ！'))
  } else {
    callback()
  }
}
// 组织社会信用代码
export const validateSocialCreditCode = function (rule, value, callback) {
  var patrn = /^[0-9A-Z]+$/
  // 18位校验及大写校验
  if ((value.length != 18) || (patrn.test(value) == false)) {
    callback(new Error('不是有效的统一社会信用编码！'))
  } else {
    var Ancode // 统一社会信用代码的每一个值
    var Ancodevalue // 统一社会信用代码每一个值的权重 
    var total = 0
    var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]//加权因子 
    var str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
    //不用I、O、S、V、Z 
    for (var i = 0; i < value.length - 1; i++) {
      Ancode = value.substring(i, i + 1)
      Ancodevalue = str.indexOf(Ancode)
      total = total + Ancodevalue * weightedfactors[i]
      //权重与加权因子相乘之和 
    }
    var logiccheckcode = 31 - total % 31

    if (logiccheckcode == 31) {
      logiccheckcode = 0
    }
    var Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y';
    var Array_Str = Str.split(',')
    logiccheckcode = Array_Str[logiccheckcode]

    var checkcode = value.substring(17, 18)
    if (logiccheckcode != checkcode) {
      callback(new Error('不是有效的统一社会信用编码！'))
    } else {
      callback()
    }
  }
}
