FROM python:3.10.1
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY semantic.py test.py  . 
RUN python test.py
CMD ["python", "test.py"]
