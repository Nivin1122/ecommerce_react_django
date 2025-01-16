from django.http import JsonResponse


class BlockUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and getattr(request.user,'is_blocked',False):
            return JsonResponse({'error':"your account is bl;ocked"}, status=403)
        return self.get_response(request)