import React, { Component, PropTypes } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import apiService from './apiService';
import {
  Grid
} from "@material-ui/core";
import NumberFormat from 'react-number-format';


const numberFormat = (value) =>
  new Intl.NumberFormat('en-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value);

class App extends Component {
  state = {
    alert_display: 'none',
    alert_value: '',
    negara: [],
    negara_value: '',
    negara_id: '',
    pelabuhan: [],
    pelabuhan_value: '',
    pelabuhan_id: '',
    barang_id: '',
    barang_value: '',
    data_barang: null,
    bea: 0,
    harga: 0,
    convHarga: '',
    total: 0,
  };

  async componentDidMount() {}

  handleNegaraChange = async (e) => {
    let negara_value = e.target.value;
    this.setState({
      negara_value: e.target.value,
    });

    if (negara_value.length >= 3) {
      console.log("value", negara_value);
      await apiService
        .fetchNegaras(negara_value)
        .then((res) => {
          console.log("data res" + JSON.stringify(res.data.data[0]));
          this.setState({
            negara_value: res.data.data[0].ur_negara,
            negara_id: res.data.data[0].kd_negara,
            alert_display: "none",
            alert_value: "",
          });
          return res;
        })
        .catch((err) => {
          console.log(JSON.stringify(err.message));
          alert(JSON.stringify(err.message));
        });
    } else {
      // alert("Type 3 letters");
      this.setState({
        alert_display: "flex",
        alert_value: "Isi kode negara dengan 3 huruf",
      });
    }
  };

  handlePelabuhanChange = async (e) => {
    let pelabuhan_value = e.target.value;
    let negara_id = this.state.negara_id;
    this.setState({
      pelabuhan_value: e.target.value,
    });
    if (pelabuhan_value.length >= 3) {
      await apiService
      .fetchPelabuhans(negara_id,pelabuhan_value)
      .then((res) => {
        // console.log("data res" + JSON.stringify(res.data));
        this.setState({
          pelabuhan_value: res.data.data[0].ur_pelabuhan,
          pelabuhan_id: res.data.data[0].kd_pelabuhan,
          alert_display: "none",
          alert_value: "",
        });
        return res;
      })
      .catch((err) => {
        console.log(JSON.stringify(err.message));
        alert(JSON.stringify(err.message));
      });
    }
    else {
      // alert("Type 3 letters");
      this.setState({
        alert_display: "flex",
        alert_value: "Isi kode pelabuhan dengan 3 huruf",
      });
    }
  };

  handleBarangChange = async (e) => {
    let barang_value = e.target.value;
    this.setState({
      barang_value: barang_value,
    });
    if (barang_value) {
      await apiService
        .fetchBarangs(barang_value)
        .then((res) => {
          console.log("data res" + JSON.stringify(res.data));
          if(res.data.data.length > 0) {
            this.setState({
              barang_value: res.data.data[0].sub_header + ' ' + res.data.data[0].uraian_id,
            });
            this.handleTarifBeaChange(barang_value);
          }
          return res;
        })
        .catch((err) => {
          console.log(JSON.stringify(err.message));
          // alert(JSON.stringify(err.message));
        });
    }
  };

  handleTarifBeaChange = async (barang_value) => {
    if (barang_value) {
      await apiService
        .fetchTarifBea(barang_value)
        .then((res) => {
          console.log("data bea" + JSON.stringify(res.data));
          if (res.data.data.length > 0) {
            this.setState({
              bea: res.data.data[0].bm,
            });
          }
          return res;
        })
        .catch((err) => {
          console.log(JSON.stringify(err.message));
          // alert(JSON.stringify(err.message));
        });
    }
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBeaChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleHargaChange = (event) => {
    let harga = event.target.value;
    let normalizeHarga = harga.replaceAll(",", "");
    normalizeHarga = Number(normalizeHarga.replaceAll("Rp ", ""));
    console.log(normalizeHarga);
    let convHarga =
      "Rp " +
      normalizeHarga.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"); // numberFormat(harga);
    this.setState({
      harga: normalizeHarga,
      convHarga: convHarga,
    });
    console.log(convHarga);

    let { bea } = this.state;
    // let total = normalizeHarga - (bea * normalizeHarga) / 100;
    // let convTotal =
    //   "Rp " + total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    let total = (bea * normalizeHarga) / 100;
    let convTotal =
      "Rp " + total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    this.setState({
      // [event.target.name]: event.target.value,
      total: convTotal,
    });
  };

  getPelabuhan = async (Id) => {
    await apiService
      .fetchPelabuhans(Id)
      .then((res) => {
        console.log("data res" + JSON.stringify(res.data));
        this.setState({
          negara: res.data,
        });
        return res;
      })
      .catch((err) => {
        console.log(JSON.stringify(err.message));
        alert(JSON.stringify(err.message));
      });
  };

  render() {
    let {
      alert_display,
      alert_value,
      negara,
      negara_value,
      negara_id,
      pelabuhan,
      pelabuhan_value,
      pelabuhan_id,
      barang_id,
      barang_value,
      data_barang,
      bea,
      harga,
      convHarga,
      total,
    } = this.state;
    // let convHarga = numberFormat(harga);
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Stack sx={{ width: "100%" }} display={`${alert_display}`} spacing={2}>
              <Alert severity="error">
                {alert_value}
              </Alert>
            </Stack>
          </Grid>

          <Grid item xs={4} md={4}>
            Negara :
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="negara"
              variant="outlined"
              size="small"
              value={`${negara_value}`}
              onChange={this.handleNegaraChange}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            Pelabuhan
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="pelabuhan"
              variant="outlined"
              size="small"
              value={`${pelabuhan_value}`}
              onChange={this.handlePelabuhanChange}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            Barang
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="barang"
              variant="outlined"
              size="small"
              onChange={this.handleBarangChange}
            />
          </Grid>

          <Grid item xs={4} md={4}></Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="data_barang"
              readOnly
              multiline
              rows={4}
              value={`${barang_value}`}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            Harga
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="harga"
              name="harga"
              value={`${convHarga}`}
              onChange={this.handleHargaChange}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            Tarif Bea Masuk
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="bea"
              name="bea"
              value={`${bea}`}
              // onChange={this.handleBeaChange}
              sx = {{
                width: '100px'
              }}
              readOnly
            /> %
          </Grid>

          <Grid item xs={4} md={4}>
            Harga Tarif x BM
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="total"
              name="total"
              defaultValue={total}
              value={`${total}`}
              // onChange={this.handleChange}
              readOnly
            />
          </Grid>
        </Grid>
        <br />
      </div>
    );
  }
}

export default App