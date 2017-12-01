'use strict'
export default [
	{
		name:'user',
		model:{
			usr_cd:'',
			pwd:'',
			time:0,
			isLogin:false
		},
		storage:true
	}
]
/**
 * StoreManager.user.get('mobile')
 * 
 * StoreManager.user.set('mobile','13566667777')
 * 
 * StoreManager.user.assign({'mobile':'13566667777',userName:'hello'})
 * 
 * StoreManager.user.copy() //return {'mobile':'13566667777',userName:'hello'}
 */