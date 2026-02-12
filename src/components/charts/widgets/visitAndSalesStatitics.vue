<script lang='js'>
import { Bar } from 'vue-chartjs';
import { encaissementService } from '@/_services/encaissements_services.js';
// import { DecaisseService } from '@/_services/decaissement_service.js';

export default {
  extends: Bar,
  props: {
    labels: {
      type: Array,
      default: () => ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC']
    }
  },
  data() {
    return {
      gradient: null,
      gradient2: null,
      encaissementData: [],
      decaissementData: []
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 181);
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 360);
    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 300);
    this.gradient.addColorStop(0, 'rgba(218, 140, 255, 1)');
    this.gradient.addColorStop(1, 'rgba(154, 85, 255, 1)');
    this.gradient2.addColorStop(0, 'rgba(255, 191, 150, 1)');
    this.gradient2.addColorStop(1, 'rgba(254, 112, 150, 1)');
    this.gradient3.addColorStop(0, 'rgba(54, 215, 232, 1)');
    this.gradient3.addColorStop(1, 'rgba(102, 205, 170, 1)');
    this.gradient3.addColorStop(1, '#1bcfb4');

    Promise.all([
      encaissementService.getencaissement(),
      DecaisseService.getdecaissement()
    ])
      .then((results) => {
        
        const encaissementRes = results[0];
        const decaissementRes = results[1];

        this.encaissementData = encaissementRes.data.data.map((item) => item.data);
        console.log(this.encaissementData.slice());

        this.decaissementData = decaissementRes.data.data.map((item) => item.data);
        console.log(this.decaissementData.slice());
          const maxDataValue = Math.max(...this.encaissementData, ...this.decaissementData);

        this.renderChart({
          labels: this.labels,
          datasets: [
            {
              label: 'Encaissement',
              data: this.encaissementData,
              borderColor: this.gradient3,
              backgroundColor: this.gradient3,
              borderWidth: 1
            },
            {
              label: 'Décaissement',
              data: this.decaissementData,
              borderColor: this.gradient2,
              backgroundColor: this.gradient2,
              borderWidth: 1
            }
          ]
        }, {
          responsive: true,
          elements: {
            point: {
              radius: 0
            }
          },
          legend: false,
          scales: {
            xAxes: [
              {
                ticks: {
                  padding: 20,
                  fontColor: "#7c827d",
                  autoSkip: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'rgba(0,0,0,1)',
                  zeroLineColor: 'rgba(235,237,242,1)'
                },
                categoryPercentage: 0.5,
                barPercentage: 0.75
              }
            ],
            yAxes: [
              {
                ticks: {
                   display: false,
                min: 0,
                //stepSize: 20,
                 
                 
                  max: maxDataValue
                },
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(235,237,242,1)',
                  zeroLineColor: 'rgba(235,237,242,1)'
                }
              }
            ]
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
</script>

<style scoped lang='scss'>
  .visitAndSalesStatitics {
  }
</style>
