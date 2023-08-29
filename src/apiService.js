import axios from "axios";

// const API_BASE_URL = 'https://financed.4netps.co.id/ujian';
const API_BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://insw-dev.ilcs.co.id/my/n";

const tokenStr = "";

class ApiService {
  fetchNegaras(id) {
    return axios.get(API_BASE_URL + "/negara?ur_negara="+id, {
      // headers: { Authorization: `Bearer ${tokenStr}` },
    });
  }

  fetchPelabuhans(kd_negara,ur_pelabuhan) {
    return axios.get(API_BASE_URL + `/pelabuhan?kd_negara=${kd_negara}&ur_pelabuhan=${ur_pelabuhan}`, {
      // headers: { Authorization: `Bearer ${tokenStr}` },
    });
  }

  fetchBarangs(hs_code) {
    return axios.get(API_BASE_URL + `/barang?hs_code=${hs_code}`, {
      // headers: { Authorization: `Bearer ${tokenStr}` },
    });
  }

  fetchTarifBea(hs_code) {
    return axios.get(API_BASE_URL + `/tarif?hs_code=${hs_code}`, {
      // headers: { Authorization: `Bearer ${tokenStr}` },
    });
  }
}

export default new ApiService();
