/**
 * 项目名称
 */
export const PROJECTNAME = "能工物联网系统";

/**
 * 线上环境
 */
export const ONLINEHOST: string = "http://116.62.206.66";

/**
 * 本地环境
 */
export const ONLOCALHOST: string = "http://127.0.0.1:8080";

/**
 * 测试环境
 */
export const QAHOST: string = "http://xxx.com";

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const BaseUrl: string =
  process.env.NODE_ENV === "production" ? ONLINEHOST : ONLOCALHOST;

/**
 * 请求的公共参数
 */
export const conmomPrams: any = {};

/**
 * @description token在Cookie中存储的天数，默认1天
 */
export const cookieExpires: number = 1;
