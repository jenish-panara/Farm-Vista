from django.shortcuts import render
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
import json
from django.core import serializers
from .models import *
import logging
import os
import google.generativeai as genai
import tempfile
from datetime import datetime


GEMINI_API_KEY='AIzaSyC8tJwh5taOMMwImn0JiA35pu_Uf-rFSlE'

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        number = data.get('number')
        passward = data.get('password')
        USER.objects.create(name=name,ph_number=number,email=email,passward=passward)
        return JsonResponse(data)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@csrf_exempt
def login(request):
    if request.method=='POST':
        data = json.loads(request.body)
        email1 = data.get('email')
        passward1 = data.get('password')
        e1= serializers.serialize('json', USER.objects.filter(email=email1,passward=passward1))
        if e1 is not None:
            return JsonResponse(e1,safe=False)
        else:
            return JsonResponse(e1,safe=False)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})  

def del_data(request):
    # ADMIN.objects.all().delete() 
    if request.method=='GET':
        # PRODUCT.objects.all().delete() 
        # USER.objects.all().delete()
        # APPOINTMENT.objects.all().delete()
        # APPOINTMENT_DETAILS.objects.all().delete()
        return True
    return True


@csrf_exempt
def up_images(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            image = request.FILES.get('image')
            price = request.POST.get('price')
            cat = request.POST.get('categorie')

            if not name or not image or not price or not cat:
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            img_model = PRODUCT(name=name, image=image, price=price, categorie=cat)
            img_model.save()

            return JsonResponse({
                'id': img_model.id,
                'name': img_model.name,
                'image': img_model.image.url,
                'price': img_model.price,
                'categorie': img_model.categorie
            })

        except Exception as e:
            print(f"Error uploading image: {str(e)}")
            return JsonResponse({'error': 'Internal server error.'}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def get_images(request):
    if request.method == 'POST':
        cat = request.POST.get('categorie')
        images = PRODUCT.objects.filter(categorie=cat)
        image_data = [
            {
                'id': img.id,
                'name': img.name,
                'image': img.image.url,
                'categorie':img.categorie,
                'price':img.price
            }
            for img in images
        ]
        return JsonResponse(image_data, safe=False) 
    return JsonResponse({'error': 'Invalid request method'}, status=400)  


@csrf_exempt
def book_appo(request):
    if request.method=="POST":
        data=json.loads(request.body)
        admin_name1 = data.get('admin_name')
        user_name1 = data.get('user_name')
        address = data.get('address')
        date = data.get('date')
        APPOINTMENT.objects.create(admin_name=admin_name1,user_name=user_name1,appointment_date=date,address=address)
        return JsonResponse(data)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)    


@csrf_exempt
def admin_signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        passward = data.get('password')
        ADMIN.objects.create(name=name,email=email,passward=passward)


        return JsonResponse(data)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@csrf_exempt
def admin_login(request):
    if request.method=='POST':
        data = json.loads(request.body)
        email1 = data.get('email')
        passward1 = data.get('password')
        e1= serializers.serialize('json', ADMIN.objects.filter(email=email1,passward=passward1))
        if e1 is not None:
            return JsonResponse(e1,safe=False)
        else:
            return JsonResponse(e1,safe=False)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


@csrf_exempt
def get_booked_appo(request):
    if request.method == 'POST':
        user_name = request.POST.get('user_name')
        data = APPOINTMENT.objects.filter(user_name=user_name)
        data1 = [
            {
                'id': d.id,
                'admin_name': d.admin_name,
                'date':d.appointment_date,
                'address':d.address,
            }
            for d in data
        ]
        return JsonResponse(data1, safe=False) 
    return JsonResponse({'error': 'Invalid request method'}, status=400)  


@csrf_exempt
def get_booked_appo_admin(request):
    if request.method == 'POST':
        admin_name = request.POST.get('admin_name')
        data = APPOINTMENT.objects.filter(admin_name=admin_name)
        data1 = [
            {
                'id': d.id,
                'user_name': d.user_name,
                'date':d.appointment_date,
                'address':d.address,
            }
            for d in data
        ]
        return JsonResponse(data1, safe=False) 
    return JsonResponse({'error': 'Invalid request method'}, status=400)




@csrf_exempt
def soil_test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)

            user_name = data.get('user_name')
            admin_name = data.get('admin')
            date = data.get('date')
            Water_Percentage = data.get('Water_Percentage')
            Air_Percentage = data.get('Air_Percentage')
            sand = data.get('sand')
            silt = data.get('silt')
            clay = data.get('clay')
            Organic_Matter_Percentage = data.get('Organic_Matter_Percentage')
            pH = data.get('pH')
            Nitrogen_Content = data.get('Nitrogen_Content')
            Phosphorus_Content = data.get('Phosphorus_Content')
            Potassium_Content = data.get('Potassium_Content')

            data123 = {
                "Water_Percentage": Water_Percentage,
                "Air_Percentage": Air_Percentage,
                "sand": sand,
                "silt": silt,
                "clay": clay,
                "Organic_Matter_Percentage": Organic_Matter_Percentage,
                "pH": pH,
                "Nitrogen_Content": Nitrogen_Content,
                "Phosphorus_Content": Phosphorus_Content,
                "Potassium_Content": Potassium_Content,
            }

            genai.configure(api_key=GEMINI_API_KEY)
            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }

            model = genai.GenerativeModel(
                model_name="gemini-1.5-pro",
                generation_config=generation_config,
                system_instruction="""
                You are a soil tester. 
                I am going to give you a JSON object with data like this: 
                Water Percentage (%), Air Percentage (%), Mineral Particles (%) (sand, silt, and clay), 
                Organic Matter Percentage (%), pH Level of Soil, Nitrogen Content (%), Phosphorus Content (%), Potassium Content (%).
                
                Based on this data, provide me a JSON object with the following keys:
                soil_condition, soil_fertility_percentage, recommended_crop, nutrients_needed, and other_suggestions.
                """,
            )

            history = []
            chat_session = model.start_chat(history=history)
            response = chat_session.send_message(json.dumps(data123))

            response_json = json.loads(response.text)

            soil_condition = response_json['soil_condition']
            soil_fertility = int(response_json['soil_fertility_percentage'])
            recommended_crop = response_json['recommended_crop']
            nutrients_needed = response_json['nutrients_needed']
            other_suggestions = response_json['other_suggestions']

            APPOINTMENT_DETAILS.objects.create(
                admin_name=admin_name,
                user_name=user_name,
                appointment_date = date,
                soil_condition=soil_condition,
                soil_fertility=soil_fertility,
                recommended_crop=recommended_crop,
                nutrients_needed=nutrients_needed,
                other_suggestions=other_suggestions
            )

            return JsonResponse(response_json, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def get_data_app(request,appo_user, appo_admin, appo_date):
    try:
        if 'T' in appo_date:
            parsed_date = datetime.strptime(appo_date.split('T')[0], '%Y-%m-%d').date()
        else:
            parsed_date = datetime.strptime(appo_date, '%Y-%m-%d').date()
        appointment = APPOINTMENT_DETAILS.objects.get(admin_name=appo_admin,user_name=appo_user,appointment_date=parsed_date.isoformat())
        data = {
            'admin_name': appointment.admin_name,
            'user_name': appointment.user_name,
            'appointment_date': appointment.appointment_date,
            'soil_condition': appointment.soil_condition,
            'soil_fertility': appointment.soil_fertility,
            'recommended_crop': appointment.recommended_crop,
            'nutrients_needed': appointment.nutrients_needed,
            'other_suggestions': appointment.other_suggestions,
        }
        return JsonResponse(data, status=200)
    except APPOINTMENT_DETAILS.DoesNotExist:
        return JsonResponse({'error': 'Appointment not found'}, status=404)

@csrf_exempt
def upload_crop_photo(request):
    if request.method == "POST":
        image = request.FILES.get('image')

        def upload_to_gemini(file):
            """Uploads the given file to Gemini API."""

            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                for chunk in file.chunks():
                    temp_file.write(chunk)
                temp_file_path = temp_file.name

            gemini_file = genai.upload_file(temp_file_path, mime_type="image/jpeg")
            os.remove(temp_file_path)

            return gemini_file

        try:
            genai.configure(api_key=GEMINI_API_KEY)
            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }
            model = genai.GenerativeModel(
                model_name="gemini-1.5-pro",
                generation_config=generation_config,
                system_instruction=(
                    "You are a crops disease specialist. I will give you a photo of plant leaves "
                    "with some disease. You must analyze it and give me the name of the disease, "
                    "how it happened, and the cure."
                ),
            )
            gemini_file = upload_to_gemini(image)
            chat_session = model.start_chat()
            response = chat_session.send_message(f"Analyze this image for disease: {gemini_file.uri}")
            print(response.text)
            response_json = json.loads(response.text)
            return JsonResponse(response_json, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)


@csrf_exempt
def get_ideal_crop(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            genai.configure(api_key=GEMINI_API_KEY)

            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }

            model = genai.GenerativeModel(
                model_name="gemini-1.5-pro",
                generation_config=generation_config,
                system_instruction=(
                    "You are a specialist in recommending ideal crops. "
                    "I am going to give you data in JSON format like this:\n"
                    "{'state':'', 'previous crop':'', 'month':''}\n"
                    "In this data, you have state, month, and previous crop. You have to give me "
                    "what crop I should plant next and what type of material I should give to the soil "
                    "before planting that crop. and the reason why i should grow this plant"
                ),
            )

            chat_session = model.start_chat(history=[])

            prompt = (
                f"State: {data['state']}, Previous crop: {data['previousCrop']}, Month: {data['month']}.\n"
                "Please provide the recommended crop and soil preparation."
            )

            response = chat_session.send_message(prompt)

            print("Gemini API raw response: ", response)

            candidates = response.candidates
            if candidates and 'content' in candidates[0]:
                content = candidates[0].content.parts[0].text
                recommendation_data = json.loads(content)
                
                print("Parsed recommendation data: ", recommendation_data)
                
                return JsonResponse({'recommendations': [recommendation_data]}, status=200)

            return JsonResponse({'error': 'No recommendations found'}, status=500)

        except Exception as e:
            print(f"Error processing request: {e}")
            return JsonResponse({'error': 'Internal server error'}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)


logger = logging.getLogger(__name__)

@csrf_exempt
def get_crop_info(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            crop_name = data.get('crop_name')

            genai.configure(api_key=GEMINI_API_KEY)

            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }

            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                generation_config=generation_config,
                system_instruction=("You are a crop specialist. I will give you a crop name in JSON format."
                                    "You will respond with the 1) required nourishment, 2) soil condition, 3) best time to grow, 4) production improvement tips for that crop, "
                                    "in JSON format.like this"
                                    "{'nourishment':'', 'soil_condition':'', 'best_time':'','production_tips':''}"
                                    ),
            )

            chat_session = model.start_chat(history=[])
            response = chat_session.send_message(crop_name)

            logger.info(f"GenAI response: {response}")

            api_data = json.loads(response.text)
            
            print(api_data)
                
            crop_info = {
                'nourishment': api_data.get('nourishment'),
                'soil_condition': api_data.get('soil_condition'),
                'best_time': api_data.get('best_time'),
                'production_tips': api_data.get('production_tips'),
                
            }

            return JsonResponse(crop_info)
            

        except Exception as e:
            logger.error(f"Error occurred: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def get_weather_info(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            crop_name = data.get('city')

            genai.configure(api_key=GEMINI_API_KEY)

            generation_config = {
                "temperature": 0,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }

            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                generation_config=generation_config,
                system_instruction=("You are a weather specialist. I will give you a city or state name in JSON format."
                                    "You will respond with the 1) today's averge temperature, 2) wind condition, 3) humidity , 4) weather prediction for that city, "
                                    "in JSON format.like this"
                                    "{'avg_temp':'', 'wind_condition':'', 'humidity':'','weather_prediction':''}"
                                    ),
            )

            chat_session = model.start_chat(history=[])
            response = chat_session.send_message(crop_name)

            logger.info(f"GenAI response: {response}")

            api_data = json.loads(response.text)
            
            print(api_data)
                
            weather_info = {
                'avg_temp': api_data.get('avg_temp'),
                'wind_condition': api_data.get('wind_condition'),
                'humidity': api_data.get('humidity'),
                'weather_prediction': api_data.get('weather_prediction'),
            }

            return JsonResponse(weather_info)
            

        except Exception as e:
            logger.error(f"Error occurred: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)



@csrf_exempt
def buy_product(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        buy = Buy.objects.create(
            name=data['name'],
            address=data['address'],
            buy_method=data['buy_method'],
            total_price=data['total_price'],
            pincode=data.get('pincode', None),
            card_number=data.get('card_number', None),
        )
        return JsonResponse({'status': 'success', 'buy_id': buy.id})
    return JsonResponse({'status': 'error'}, status=400)

@csrf_exempt
def delete_appointment(request, user_name, admin_name, appointment_date):
    if request.method == 'DELETE':
        try:
            appointment = APPOINTMENT.objects.get(
                user_name=user_name, 
                admin_name=admin_name, 
                appointment_date=appointment_date
            )
            appointment.delete()
            return JsonResponse({'message': 'Appointment deleted successfully'}, status=200)
        except APPOINTMENT.DoesNotExist:
            return JsonResponse({'error': 'Appointment not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)    