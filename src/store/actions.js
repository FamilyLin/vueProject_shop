/**
 * vuex的actions模块
 * 通过mutation间接更新state的多个方法的对象
 */

import {reqAddress,reqFoodCategorys, reqShops} from '../api'
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutation-types'

export default{
	//异步获取地址
	async getAddress({commit, state}){
		//发送异步ajax请求
		const geohash = state.latitude + ',' + state.longitude
		const result = await reqAddress(geohash)
		//提交一个mutation
		if(result.code === 0){
			const address = result.data
			commit(RECEIVE_ADDRESS, {address})
		}
		 
	},

	//异步获取分类列表
	async getCategorys({commit}) {
		const result = await reqFoodCategorys()
		commit(RECEIVE_CATEGORYS, {categorys: result.data})
	},

		// 异步获取商家列表
		async getShops({commit, state}) {
			// 发送异步ajax请求
			const {longitude, latitude} = state
			const result = await reqShops({longitude, latitude})
			// 提交一个mutation
			if (result.code === 0) {
				const shops = result.data
				commit(RECEIVE_SHOPS, {shops})
			}
		},
}