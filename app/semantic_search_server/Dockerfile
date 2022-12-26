FROM python:3.10.1
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY sem.py sem_init.py ./ 
RUN python sem_init.py
EXPOSE 9060
CMD ["python", "sem.py"]
