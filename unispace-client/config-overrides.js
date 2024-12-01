module.exports = function override(config, env) {
    // devServer 설정 추가
    if (config.devServer) {
      config.devServer.allowedHosts = ['localhost']; // 필요한 경우 도메인 추가
    }
    return config;
  };
  