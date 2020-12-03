from config import *
from models import Book, Reader, Review 


@app.route("/get/<string:class_name>")
def get(class_name):
    try:
        data = db.session.query(eval(class_name.capitalize())).all()
        json_list = [ obj.json() for obj in data ]
        response = jsonify(json_list)
    except Exception as e:
        response = jsonify({"status": "400", "result": "error", "details ": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/create/<string:class_name>', methods=['POST'])
def create(class_name):
    response = jsonify({"status": "200", "result": "ok", "details": f"{class_name} created"})
    data = request.get_json()
    try:
        new_obj = eval(class_name.capitalize())(**data)
        db.session.add(new_obj)
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400", "result": "error", "details ": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response 


@app.route('/delete/<string:class_name>/<int:id>', methods=['DELETE'] )
def delete(class_name, id):
    response = jsonify({"status": "200", "result": "ok", "details": "Book deleted"})
    try:
        eval(class_name.capitalize()).query.filter(eval(class_name.capitalize()).id == id).delete()
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400" , "result": "error", "details": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    
    
if __name__ == '__main__':
    app.run(debug=True)