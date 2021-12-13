enum DATA {
  GET = "/data/get_data",
  SAVE = "/data/save_data"
}

enum DEVICE {
  GET = "/device/get_devices",
  UPDATE = "/device/update_name"
}

enum SETTING {
  GET_ALL = "/setting/get_settings",
  GET = "/setting/get_setting",
  UPDATE = "/setting/update_settings"
}

export const URL = {
  DATA,
  DEVICE,
  SETTING
}

