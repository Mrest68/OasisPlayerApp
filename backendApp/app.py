import os
from flask import Flask, request, jsonify
import pyrebase
import firebase_admin
from firebase_admin import credentials, firestore, storage
import urllib.parse


from dotenv import load_dotenv

# Specify the correct path to your environment file
load_dotenv(dotenv_path='/Users/miguelrestrepo/Desktop/appContainer/OasisApp/.env')
import os


cred = credentials.Certificate(os.getenv('GOOGLE_APPLICATION_CREDENTIALS'))
firebase_admin.initialize_app(cred,{
    "storageBucket": os.getenv('STORAGE_BUCKET'),
})

firebase_config = {
    "apiKey": os.getenv('FIREBASE_API_KEY'),
    "authDomain": os.getenv('FIREBASE_AUTH_DOMAIN'),
    "databaseURL": os.getenv('FIREBASE_DATABASE_URL'),
    "storageBucket": os.getenv('FIREBASE_STORAGE_BUCKET'),
    "messagingSenderId": os.getenv('FIREBASE_MESSAGING_SENDER_ID'),
    "appId": os.getenv('FIREBASE_APP_ID')
}
print(os.getenv('GOOGLE_APPLICATION_CREDENTIALS'))

firebase = pyrebase.initialize_app(firebase_config)
auth = firebase.auth()
db = firestore.client()

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')


    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return jsonify({"success": True, "token": user['idToken']}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

# @app.route('/test', methods=['GET'])
# def test_storage():
#     try:
#         doc_ref = db.collection('interviews').stream()

#         docs = [doc.to_dict() for doc in doc_ref]
        
#         print(f"Test Documents: {docs}")
#         return jsonify({"success": True, "docs": docs}), 200
    
#     except Exception as e:
#         print(f"Error: {str(e)}")
#         return jsonify({"success": False, "error": str(e)}), 400
    
def get_accessToken(blobName):
    try:
        doc_ref = db.collection('accessToken').document(blobName).get()
        if doc_ref.exists:
                data = doc_ref.to_dict()
                token = data.get('accessToken')
                title = data.get('Title')
                category = data.get('category')
                description = data.get('description')
                
                return token,title,category,description

        else:
            print("no token for that vid")
            return None,"No title","No category","No description"
    except Exception as e:
        print(str(e))
        return None, "No title","No category","No description"




@app.route('/interview', methods=["GET"])
def getInterview():
    folderPath = "Interviews/"
    urls = []
    bucket = storage.bucket()
    blobs = bucket.list_blobs(prefix=folderPath)

    try:
        for blob in blobs:
            relative_path = blob.name[len(folderPath):]
            full_blobName = f"{folderPath}{relative_path}"
            encoded_blobName = full_blobName.replace('/', '%2F')  
            blobNameWithoutExt = relative_path.rsplit('.', 1)[0]
            blobNameWithoutExt = blobNameWithoutExt.rstrip('/')


            token,title,category,description = get_accessToken(blobNameWithoutExt)

            public_url = f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/{encoded_blobName}?alt=media&token={token}"
            print(public_url)

            urls.append({
                "url": public_url,
                "name": title,
                "category":category,
                "description":description
            })
        return jsonify({'success': True, 'video_urls': urls}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400
    
@app.route('/tutorials', methods=["GET"])
def getTutorial():
    folderPath = "Tutorials/"
    urls = []
    bucket = storage.bucket()
    blobs = bucket.list_blobs(prefix=folderPath)

    try:
        for blob in blobs:
            relative_path = blob.name[len(folderPath):]
            full_blobName = f"{folderPath}{relative_path}"
            encoded_blobName = full_blobName.replace('/', '%2F')  
            blobNameWithoutExt = relative_path.rsplit('.', 1)[0]
            print(blobNameWithoutExt)
            token,title,category,description= get_accessToken(blobNameWithoutExt)

            public_url = f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/{encoded_blobName}?alt=media&token={token}"
            urls.append({
                "url": public_url,
                "name": title,
                "category":category,
                'description':description,
            })
        return jsonify({'success': True, 'video_urls': urls}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400
    
@app.route('/homework', methods=["GET"])
def getHW():
    folderPath = "homework"
    try:
        db_ref = db.collection(folderPath).document('HW1').get()
        title = None
        description = None
        if db_ref.exists:
            data = db_ref.to_dict()
            title = data.get('Title')
            description= data.get('description')

        
        return jsonify({'success': True, 'title': title, 'description': description}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

def get_ProfilePic(picToken, picName):
    folderPath = 'playerPictures/'
    bucket = storage.bucket()
    full_blobName = f"{folderPath}{picName}"
    encoded_blobName = full_blobName.replace('/', '%2F')

    public_url = f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/{encoded_blobName}?alt=media&token={picToken}"
    return public_url

@app.route('/getUserInfo', methods=['GET'])
def get_UserInfo():
    playerName = request.args.get('playerName')
    playerInfo = []
    try:
        doc_ref = db.collection('playerInfo').document(playerName).get()
        if doc_ref.exists:
            data = doc_ref.to_dict()
            picName = data.get('picName')
            picToken = data.get('picToken')
            playerName = data.get('Name')
            overall = data.get('Overall')
            position = data.get('playerPosition')
            ageGroup = data.get('ageGroup')
            
            # Construct profile picture URL
            profilPicUrl = get_ProfilePic(picToken, picName)
            
            # Append player info
            playerInfo.append({
                'Name': playerName,
                'Overall': overall,
                'playerPosition': position,
                'ageGroup': ageGroup,
                'profilPicUrl': profilPicUrl
            })
            
            return jsonify({'success': True, 'userInfo': playerInfo}), 200
        else:
            return jsonify({'success': False, 'error': 'Player not found'}), 404
    except Exception as e:
        print(f"Error fetching player info: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

