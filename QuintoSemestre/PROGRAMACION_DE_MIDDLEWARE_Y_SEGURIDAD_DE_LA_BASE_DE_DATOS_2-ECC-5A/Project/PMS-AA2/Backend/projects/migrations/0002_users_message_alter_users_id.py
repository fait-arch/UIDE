# Generated by Django 5.1.5 on 2025-01-23 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='message',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
