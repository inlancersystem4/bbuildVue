import Axios from 'axios';


var base_url = '';
// base_url = 'http://192.168.1.10:8000/';
// base_url = 'http://127.0.0.1:8000/';
// base_url = 'https://devapi.caprock.com.au/';
base_url = 'http://127.0.0.1:8000/'

class Common {

    base_url() {
        return base_url;
    }


    get_directors(token) {
        let form_data = new FormData();
        form_data.append('user_token', token);
        var url = base_url + 'upload-s';
        // var url = 'https://dog.ceo/api/breeds/image/random';   
        var options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return Axios.post(url, form_data, options);
    }


    upload_chunk(token, blob, chunk_num, file_obj, file_token, total_chunks, chunk_size) {
        let form_data = new FormData();
        form_data.append('user_token', token);
        form_data.append('blob', blob, file_obj['name']);
        form_data.append('chunk_num', chunk_num);
        form_data.append('file_token', file_token);
        form_data.append('total_chunks', total_chunks);
        form_data.append('chunk_size', chunk_size);
        form_data.append('file_obj', JSON.stringify(file_obj));
        var url = base_url + 'upload-chunk';

        var options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            }
        };
        // Axios.defaults.headers.common[''] = '*';
        return Axios.post(url, form_data, options);
    }

    async initiate_file(form_data) {
        var url = base_url + 'initiate-file';
        var options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            }
        };
        // Axios.defaults.headers.common[''] = '*';
        return await Axios.post(url, form_data, options);
    }




}
export default new Common();