import request from '@/config/axios'
import { TransferReqVO } from '@/api/crm/customer'

export interface ContractVO {
  id: number
  name: string
  no: string
  customerId: number
  customerName?: string
  businessId: number
  businessName: string
  contactLastTime: Date
  ownerUserId: number
  ownerUserName?: string
  ownerUserDeptName?: string
  processInstanceId: number
  auditStatus: number
  orderDate: Date
  startTime: Date
  endTime: Date
  totalProductPrice: number
  discountPercent: number
  totalPrice: number
  signContactId: number
  signContactName?: string
  signUserId: number
  signUserName: string
  remark: string
  createTime?: Date
  creator: string
  creatorName: string
  updateTime?: Date
  products?: [
    {
      id: number
      productId: number
      productName: string
      productNo: string
      productUnit: number
      productPrice: number
      contractPrice: number
      count: number
      totalPrice: number
    }
  ]
}

// 查询 CRM 合同列表
export const getContractPage = async (params) => {
  return await request.get({ url: `/crm/contract/page`, params })
}

// 查询 CRM 联系人列表，基于指定客户
export const getContractPageByCustomer = async (params: any) => {
  return await request.get({ url: `/crm/contract/page-by-customer`, params })
}

// 查询 CRM 合同详情
export const getContract = async (id: number) => {
  return await request.get({ url: `/crm/contract/get?id=` + id })
}

// 新增 CRM 合同
export const createContract = async (data: ContractVO) => {
  return await request.post({ url: `/crm/contract/create`, data })
}

// 修改 CRM 合同
export const updateContract = async (data: ContractVO) => {
  return await request.put({ url: `/crm/contract/update`, data })
}

// 删除 CRM 合同
export const deleteContract = async (id: number) => {
  return await request.delete({ url: `/crm/contract/delete?id=` + id })
}

// 导出 CRM 合同 Excel
export const exportContract = async (params) => {
  return await request.download({ url: `/crm/contract/export-excel`, params })
}

// 提交审核
export const submitContract = async (id: number) => {
  return await request.put({ url: `/crm/contract/submit?id=${id}` })
}

// 合同转移
export const transferContract = async (data: TransferReqVO) => {
  return await request.put({ url: '/crm/contract/transfer', data })
}
