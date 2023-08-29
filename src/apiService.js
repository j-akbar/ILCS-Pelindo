import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://insw-dev.ilcs.co.id/my/n";

const tokenStr = "";

class ApiService {
  fetchNegaras(id) {
    return axios.get(API_BASE_URL + "/negara?ur_negara="+id, {
    });
  }

  fetchPelabuhans(kd_negara,ur_pelabuhan) {
    return axios.get(API_BASE_URL + `/pelabuhan?kd_negara=${kd_negara}&ur_pelabuhan=${ur_pelabuhan}`, {
    });
  }

  fetchBarangs(hs_code) {
    return axios.get(API_BASE_URL + `/barang?hs_code=${hs_code}`, {
    });
  }

  fetchTarifBea(hs_code) {
    return axios.get(API_BASE_URL + `/tarif?hs_code=${hs_code}`, {
    });
  }
}

export default new ApiService();
