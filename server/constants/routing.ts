export default {
  apiBase: "api",
  version: null,
  getApiRoot() {
    return `/${this.apiBase}${this.version ? `/v${this.version}` : ""}`;
  }
};
