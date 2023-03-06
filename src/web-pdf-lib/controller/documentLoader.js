// function _saveDocument(data, isUnload) {
//     const xhr = new XMLHttpRequest();
//     const formdata = new FormData();

//     formdata.enctype = 'multipart/form-data';
//     formdata.method = 'post';
//     formdata.append("open", _getEncodingOpen(_parameters.open));
//     formdata.append("docId", _documentId);
//     formdata.append("adapter", _parameters.adapter);
//     formdata.append("userSession", _parameters.smb_conn);
//     formdata.append("type", _requestName.save);
//     formdata.append("smb", _parameters.smb);
//     formdata.append("document_session_auth_token", _parameters.document_session_auth_token);
//     formdata.append("locale", _parameters.lang);
//     formdata.append("unlock", isUnload);
//     formdata.append("data", data);

//     xhr.open("Post", "handler/save", true);
//     xhr.onload = function (e) {
//         UiManager.hideLoadingProgress();
//         // if (xhr.status === 200) {
//         //     successCb(e.target.response);
//         // } else {
//         //     errorCb(xhr);
//         // }
//     };

//     xhr.send(formdata);
// }

export default {
	save: function (data, isUnload= false) {
        // _saveDocument(data, isUnload);
		console.warn(`save(data, isUnload= false) 구현 필요`);
    },
};