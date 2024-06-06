import { CACHE_KEY, useCache } from '@/hooks/web/useCache'

const { t } = useI18n() // 国际化

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermi(value: string[] | string) {
  if (!value || (value instanceof Array && !value.length)) {
    console.error(t('permission.hasPermission'))
    return false
  }
  let tmp_val = [value]
  if (value instanceof Array) {
    tmp_val = value
  }

  const { wsCache } = useCache()
  const permissionDatas = tmp_val
  const all_permission = '*:*:*'
  const permissions = wsCache.get(CACHE_KEY.USER).permissions
  const hasPermission = permissions.some((permission) => {
    return all_permission === permission || permissionDatas.includes(permission)
  })
  return !!hasPermission
}

export const checkPermission = checkPermi

/**
 * 角色权限校验
 * @param {string[]} value 校验值
 * @returns {Boolean}
 */
export function checkRole(value: string[]) {
  if (value && value instanceof Array && value.length > 0) {
    const { wsCache } = useCache()
    const permissionRoles = value
    const super_admin = 'admin'
    const roles = wsCache.get(CACHE_KEY.USER).roles
    const hasRole = roles.some((role) => {
      return super_admin === role || permissionRoles.includes(role)
    })
    return !!hasRole
  } else {
    console.error(t('permission.hasRole'))
    return false
  }
}
